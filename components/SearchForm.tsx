"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function normalize(u: string) {
  return u.trim().toLowerCase();
}

export default function SearchForm() {
  const router = useRouter();
  const [u, setU] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const v = normalize(u);
        if (v) router.push(`/r/${encodeURIComponent(v)}`);
      }}
      style={{ display: "flex", gap: 12 }}
    >
      <input
        value={u}
        onChange={(e) => setU(e.target.value)}
        placeholder="username"
        required
        maxLength={32}
        style={{
          flex: 1,
          padding: "12px 14px",
          borderRadius: 4,
          border: "1px solid #333",
          background: "#1a1a1a",
          color: "#e0e0e0",
          fontSize: 14,
          fontFamily: "inherit",
          outline: "none",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#FF6B35";
          e.target.style.background = "#1f1f1f";
          e.target.style.boxShadow = "0 0 0 3px rgba(255, 107, 53, 0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#333";
          e.target.style.background = "#1a1a1a";
          e.target.style.boxShadow = "none";
        }}
        onMouseEnter={(e) => {
          if (document.activeElement !== e.target) {
            e.currentTarget.style.borderColor = "#444";
          }
        }}
        onMouseLeave={(e) => {
          if (document.activeElement !== e.target) {
            e.currentTarget.style.borderColor = "#333";
          }
        }}
      />
      <button
        type="submit"
        style={{
          padding: "12px 20px",
          borderRadius: 4,
          border: "1px solid #FF6B35",
          background: "transparent",
          color: "#FF6B35",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: 14,
          fontFamily: "inherit",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#FF6B35";
          e.currentTarget.style.color = "#0a0a0a";
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 53, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#FF6B35";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
      >
        Search
      </button>
    </form>
  );
}

