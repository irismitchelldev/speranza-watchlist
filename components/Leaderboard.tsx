import Link from "next/link";

export type Row = { username: string; count: number };

export default function Leaderboard({ rows }: { rows: Row[] }) {
  if (rows.length === 0) return <p style={{ color: "#666", fontSize: 14 }}>No incidents logged yet.</p>;

  return (
    <ul style={{ paddingLeft: 0, marginTop: 12, listStyle: "none" }}>
      {rows.map((r, idx) => (
        <li
          key={r.username}
          style={{
            padding: "12px 0",
            borderBottom: idx < rows.length - 1 ? "1px solid #222" : "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            borderRadius: 4,
            marginLeft: "-8px",
            marginRight: "-8px",
            paddingLeft: "8px",
            paddingRight: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#1a1a1a";
            e.currentTarget.style.transform = "translateX(4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          <Link
            href={`/r/${encodeURIComponent(r.username)}`}
            style={{
              color: "#FF6B35",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: 14,
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ff8c5a";
              e.currentTarget.style.transform = "translateX(2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#FF6B35";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            {r.username}
          </Link>
          <span
            style={{
              color: "#888",
              fontSize: 13,
              fontFamily: "ui-monospace, monospace",
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
          >
            {r.count}
          </span>
        </li>
      ))}
    </ul>
  );
}

