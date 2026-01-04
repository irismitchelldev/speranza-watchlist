"use client";

import { ReactNode } from "react";

export default function InteractiveCard({ 
  children, 
  marginBottom 
}: { 
  children: ReactNode;
  marginBottom?: number;
}) {
  return (
    <div
      style={{
        border: "1px solid #222",
        borderRadius: 4,
        padding: 24,
        background: "#111",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        marginBottom: marginBottom ?? 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#333";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#222";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </div>
  );
}

