"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReportForm({ defaultUsername = "" }: { defaultUsername?: string }) {
  const [username, setUsername] = useState(defaultUsername);
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("reason", reason);

      const response = await fetch("/api/report", {
        method: "POST",
        body: formData,
        redirect: "manual", // Handle redirects manually
      });

      // Check for redirect (status 303, 302, 301)
      if (response.status === 303 || response.status === 302 || response.status === 301) {
        const location = response.headers.get("location");
        if (location) {
          router.push(location);
          return;
        }
        // Fallback: construct redirect URL from username
        if (username) {
          router.push(`/r/${encodeURIComponent(username)}`);
          return;
        }
      }

      // Check for errors (including rate limiting - 429)
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json().catch(() => ({}));
          setError(data.error || "Failed to submit report. Please try again.");
        } else {
          setError("Failed to submit report. Please try again.");
        }
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <input
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="player#1234"
        required
        maxLength={40}
        style={{
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
      <input
        name="reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="What happened topside? (short)"
        required
        maxLength={140}
        style={{
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
      {error && (
        <div
          style={{
            padding: "12px 14px",
            borderRadius: 4,
            border: "1px solid #FF6B35",
            background: "#1a1a1a",
            color: "#FF6B35",
            fontSize: 13,
            animation: "fadeIn 0.3s ease-in",
            boxShadow: "0 0 0 1px rgba(255, 107, 53, 0.1)",
            lineHeight: 1.5,
          }}
        >
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          padding: "12px 20px",
          borderRadius: 4,
          border: "1px solid #FF6B35",
          background: isSubmitting ? "#666" : "#FF6B35",
          color: "#0a0a0a",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          width: "fit-content",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "inherit",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: isSubmitting ? 0.6 : 1,
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.background = "#ff8c5a";
            e.currentTarget.style.borderColor = "#ff8c5a";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 53, 0.3)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.background = "#FF6B35";
            e.currentTarget.style.borderColor = "#FF6B35";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }
        }}
        onMouseDown={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.transform = "translateY(0)";
          }
        }}
        onMouseUp={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
      >
        {isSubmitting ? "Submitting..." : "Submit incident"}
      </button>
    </form>
  );
}

