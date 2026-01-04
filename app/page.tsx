import { redis } from "@/lib/redis";
import ReportForm from "@/components/ReportForm";
import SearchForm from "@/components/SearchForm";
import Leaderboard, { Row } from "@/components/Leaderboard";
import { isKvConfigured, getKvErrorMessage } from "@/lib/kv-check";
import InteractiveSection from "@/components/InteractiveSection";

async function getTop(limit = 25): Promise<Row[]> {
  try {
    const items = await redis.zrange<string[]>("reports:z", 0, limit - 1, {
      rev: true,
      withScores: true,
    });

    const rows: Row[] = [];
    for (let i = 0; i < items.length; i += 2) {
      rows.push({ username: items[i] as unknown as string, count: Number(items[i + 1]) });
    }
    return rows;
  } catch (error) {
    console.error("Error fetching top reports:", error);
    return [];
  }
}

export default async function Home() {
  const kvConfigured = isKvConfigured();
  const top = await getTop(25);

  return (
    <main style={{ maxWidth: 900, margin: "60px auto", padding: "0 24px", fontFamily: "inherit" }}>
      <header style={{ marginBottom: 48, animation: "slideUp 0.6s ease-out" }}>
        <h1
          style={{
            fontSize: 42,
            marginBottom: 8,
            fontWeight: 700,
            color: "#e0e0e0",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            transition: "color 0.3s ease",
          }}
        >
          Speranza Watchlist
        </h1>
        <p style={{ marginTop: 0, color: "#888", fontSize: 14, fontWeight: 400 }}>
          Log a surface incident. Then run a background check on a raider by their Embark ID.
        </p>
        <p
          style={{
            marginTop: 12,
            color: "#666",
            fontSize: 11,
            fontStyle: "italic",
            lineHeight: 1.5,
            borderTop: "1px solid #222",
            paddingTop: 12,
          }}
        >
          <strong style={{ color: "#FF6B35" }}>Disclaimer:</strong> This is an unofficial, fan-made tool.
          All content is user-generated and unverified. Operators are not responsible for accuracy,
          harassment, or misuse. Use at your own risk and responsibly. Embark IDs must be in format: name#1234
        </p>
      </header>

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
          <pre
            style={{
              fontSize: 12,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              margin: 0,
              color: "#aaa",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            {getKvErrorMessage()}
          </pre>
        </div>
      )}

      <div style={{ display: "grid", gap: 24, marginTop: 32 }}>
        <InteractiveSection>
          <h2
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 600,
              color: "#FF6B35",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 16,
              transition: "color 0.2s ease",
            }}
          >
            Log a surface incident
          </h2>
          <div style={{ marginTop: 12 }}>
            <ReportForm />
          </div>
        </InteractiveSection>

        <InteractiveSection>
          <h2
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 600,
              color: "#FF6B35",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 16,
              transition: "color 0.2s ease",
            }}
          >
            Background check
          </h2>
          <div style={{ marginTop: 12 }}>
            <SearchForm />
          </div>
          <p style={{ marginTop: 16, color: "#666", fontSize: 12 }}>
            Unofficial tool — {`don't`} use it to harass people.
          </p>
        </InteractiveSection>

        <InteractiveSection>
          <h2
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 600,
              color: "#FF6B35",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 16,
              transition: "color 0.2s ease",
            }}
          >
            Most reported
          </h2>
          <Leaderboard rows={top} />
        </InteractiveSection>
      </div>
    </main>
  );
}

