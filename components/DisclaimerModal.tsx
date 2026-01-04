"use client";

import { useState, useEffect } from "react";

export default function DisclaimerModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already accepted the disclaimer
    const accepted = localStorage.getItem("disclaimer-accepted");
    if (!accepted) {
      setShow(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    // Cleanup: restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    // Update body scroll based on modal visibility
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [show]);

  const handleAccept = () => {
    localStorage.setItem("disclaimer-accepted", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 24,
        animation: "fadeIn 0.3s ease-in",
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          background: "#111",
          border: "2px solid #FF6B35",
          borderRadius: 8,
          padding: 32,
          maxWidth: 600,
          width: "100%",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          animation: "slideUp 0.4s ease-out",
          pointerEvents: "auto",
        }}
      >
        <h2
          style={{
            margin: "0 0 16px 0",
            fontSize: 24,
            fontWeight: 700,
            color: "#FF6B35",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Important Disclaimer
        </h2>

        <div
          style={{
            color: "#e0e0e0",
            fontSize: 14,
            lineHeight: 1.7,
            marginBottom: 24,
          }}
        >
          <p style={{ margin: "0 0 16px 0" }}>
            <strong style={{ color: "#FF6B35" }}>This is an unofficial, fan-made tool.</strong> It is not
            affiliated with, endorsed by, or connected to any game developer, publisher, or official
            moderation system.
          </p>

          <p style={{ margin: "0 0 16px 0" }}>
            <strong style={{ color: "#FF6B35" }}>User-Generated Content:</strong> All reports and
            information on this platform are submitted by users. The operators of this service do not
            verify, endorse, or take responsibility for the accuracy, truthfulness, or validity of any
            user-submitted content.
          </p>

          <p style={{ margin: "0 0 16px 0" }}>
            <strong style={{ color: "#FF6B35" }}>No Responsibility:</strong> The operators of this service
            are not responsible for:
          </p>

          <ul
            style={{
              margin: "0 0 16px 0",
              paddingLeft: 24,
              color: "#aaa",
            }}
          >
            <li>Any false, misleading, or defamatory content posted by users</li>
            <li>Any harassment, bullying, or misuse of this platform</li>
            <li>Any consequences resulting from the use of information on this platform</li>
            <li>Any disputes between users</li>
          </ul>

          <p style={{ margin: "0 0 16px 0" }}>
            <strong style={{ color: "#FF6B35" }}>Use at Your Own Risk:</strong> This tool is provided
            "as-is" without any warranties. Use this platform responsibly and do not use it to harass,
            defame, or harm others.
          </p>

          <p style={{ margin: 0, fontSize: 12, color: "#888", fontStyle: "italic" }}>
            By clicking "I Understand and Accept", you acknowledge that you have read and understood
            this disclaimer and agree to use this platform responsibly.
          </p>
        </div>

        <button
          onClick={handleAccept}
          style={{
            width: "100%",
            padding: "14px 20px",
            borderRadius: 4,
            border: "1px solid #FF6B35",
            background: "#FF6B35",
            color: "#0a0a0a",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "inherit",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#ff8c5a";
            e.currentTarget.style.borderColor = "#ff8c5a";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 53, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#FF6B35";
            e.currentTarget.style.borderColor = "#FF6B35";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          I Understand and Accept
        </button>
      </div>
    </div>
  );
}

