import { redis } from "@/lib/redis";
import ReportForm from "@/components/ReportForm";
import { tierFor } from "@/lib/tiers";
import { isKvConfigured } from "@/lib/kv-check";
import InteractiveCard from "@/components/InteractiveCard";
import InteractiveListItem from "@/components/InteractiveListItem";

type Incident = { reason: string; at: number };

async function getProfile(username: string) {
  try {
    const count = Number((await redis.zscore("reports:z", username)) ?? 0);
    const tier = tierFor(count);

    const incidentsRaw = await redis.lrange<string[]>(`reports:l:${username}`, 0, 24);
    const incidents: Incident[] = incidentsRaw
      .map((s) => {
        try {
          return JSON.parse(s) as Incident;
        } catch {
          return null;
        }
      })
      .filter(Boolean) as Incident[];

    const meta = (await redis.hgetall<Record<string, string | number>>(`reports:h:${username}`)) ?? {};
    return { username, count, tier, incidents, meta };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return {
      username,
      count: 0,
      tier: tierFor(0),
      incidents: [],
      meta: {},
    };
  }
}

export default async function RaiderPage({ params }: { params: { username: string } }) {
  // Decode and preserve Embark ID format (keep #1234 part)
  const decoded = decodeURIComponent(params.username);
  // Convert to lowercase but preserve the #1234 part
  const parts = decoded.split('#');
  const username = parts.length === 2 
    ? `${parts[0].toLowerCase()}#${parts[1]}`
    : decoded.toLowerCase();
  const kvConfigured = isKvConfigured();
  const p = await getProfile(username);

  return (
    <main style={{ maxWidth: 900, margin: "60px auto", padding: "0 24px", fontFamily: "inherit" }}>
      <a
        href="/"
        style={{
          color: "#FF6B35",
          textDecoration: "none",
          fontSize: 14,
          fontWeight: 500,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 24,
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          padding: "4px 0",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#ff8c5a";
          e.currentTarget.style.transform = "translateX(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#FF6B35";
          e.currentTarget.style.transform = "translateX(0)";
        }}
      >
        <span>←</span> Back
      </a>

      <h1
        style={{
          fontSize: 42,
          margin: "0 0 8px 0",
          fontWeight: 700,
          color: "#e0e0e0",
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
        }}
      >
        Raider Background Check
      </h1>
      <p style={{ marginTop: 0, marginBottom: 24, color: "#888", fontSize: 12 }}>
        Embark ID format: name#1234
      </p>

      {!kvConfigured && (
        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid #FF6B35",
            borderRadius: 4,
            padding: 16,
            marginBottom: 32,
          }}
        >
          <strong style={{ display: "block", marginBottom: 8, color: "#FF6B35", fontSize: 13 }}>
            ⚠️ Upstash Redis Not Configured
          </strong>
          <p style={{ margin: 0, fontSize: 13, color: "#aaa" }}>
            Please configure Upstash Redis to view and save reports. See the homepage for setup instructions.
          </p>
        </div>
      )}

      <InteractiveCard marginBottom={32}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div
              style={{
                fontSize: 12,
                color: "#888",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
                fontWeight: 500,
              }}
            >
              Embark ID
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#FF6B35",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              {p.username}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 12,
                color: "#888",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
                fontWeight: 500,
              }}
            >
              Reputation
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#e0e0e0",
                marginBottom: 8,
              }}
            >
              {p.tier.label}{" "}
              <span style={{ color: "#FF6B35", fontFamily: "ui-monospace, monospace" }}>
                ({p.tier.code})
              </span>
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#888",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              Reports: <strong style={{ color: "#FF6B35" }}>{p.count}</strong>
            </div>
            {p.incidents.length > 0 && (
              <div
                style={{
                  fontSize: 11,
                  color: "#666",
                  fontFamily: "ui-monospace, monospace",
                  marginTop: 8,
                }}
              >
                Last: {new Date(p.incidents[0].at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            )}
          </div>
        </div>
      </InteractiveCard>

      <h2
        style={{
          marginTop: 0,
          marginBottom: 16,
          fontSize: 16,
          fontWeight: 600,
          color: "#FF6B35",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        Recent surface incidents
      </h2>
      {p.incidents.length === 0 ? (
        <p style={{ color: "#666", fontSize: 14 }}>No incidents logged yet.</p>
      ) : (
        <ul style={{ paddingLeft: 0, listStyle: "none", margin: 0 }}>
          {p.incidents.map((i, idx) => {
            const reportDate = new Date(i.at);
            const dateStr = reportDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const timeStr = reportDate.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });
            
            return (
              <InteractiveListItem key={idx} isLast={idx === p.incidents.length - 1}>
                <div style={{ color: "#e0e0e0", fontSize: 14, marginBottom: 8, lineHeight: 1.5 }}>
                  {i.reason}
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <div
                    style={{
                      color: "#888",
                      fontSize: 12,
                      fontFamily: "ui-monospace, monospace",
                      fontWeight: 500,
                    }}
                  >
                    {dateStr}
                  </div>
                  <div
                    style={{
                      color: "#666",
                      fontSize: 11,
                      fontFamily: "ui-monospace, monospace",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {timeStr}
                  </div>
                </div>
              </InteractiveListItem>
            );
          })}
        </ul>
      )}

      <hr style={{ margin: "32px 0", border: "none", borderTop: "1px solid #222" }} />

      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "#FF6B35",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          marginBottom: 16,
        }}
      >
        Log a new incident
      </h3>
      <ReportForm defaultUsername={p.username} />

      <p style={{ marginTop: 32, color: "#666", fontSize: 12, fontStyle: "italic" }}>
        Disclaimer: fan-made watchlist UI. Not official moderation. Use responsibly.
      </p>
    </main>
  );
}

