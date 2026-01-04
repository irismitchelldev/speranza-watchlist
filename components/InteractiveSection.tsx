"use client";

import { ReactNode } from "react";

export default function InteractiveSection({ children }: { children: ReactNode }) {
  return (
    <section
      style={{
        border: "1px solid #222",
        borderRadius: 4,
        padding: 24,
        background: "#111",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#333";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#222";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </section>
  );
}

