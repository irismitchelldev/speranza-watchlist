"use client";

import { ReactNode } from "react";

export default function InteractiveListItem({ 
  children, 
  isLast 
}: { 
  children: ReactNode;
  isLast?: boolean;
}) {
  return (
    <li
      style={{
        padding: "16px 12px",
        borderBottom: !isLast ? "1px solid #222" : "none",
        borderRadius: 4,
        marginLeft: "-12px",
        marginRight: "-12px",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
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
      {children}
    </li>
  );
}

