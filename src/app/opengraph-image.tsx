import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Demo - the student portal your school can call its own";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF7F1",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#A8481F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFF8F2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
              <path d="M18 4.933V21" />
              <path d="m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6" />
              <path d="m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11" />
              <path d="M6 4.933V21" />
              <circle cx="12" cy="9" r="2" />
            </svg>
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, color: "#1C1917" }}>
            Demo
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.05,
              letterSpacing: -2,
              fontWeight: 600,
              color: "#1C1917",
              maxWidth: 920,
            }}
          >
            The student portal your school can call its own.
          </div>
          <div style={{ fontSize: 30, color: "#57504A", maxWidth: 780 }}>
            Grades, attendance, schedules, fees, announcements, and a digital
            student ID - one calm, offline-friendly portal for Philippine
            schools.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 24 }}>
          {["Student portal", "Parent access", "Teacher tools", "Admin console"].map(
            (item) => (
              <div
                key={item}
                style={{
                  border: "1px solid #E6DDCF",
                  borderRadius: 999,
                  padding: "8px 22px",
                  color: "#57504A",
                  background: "#FFFFFF",
                }}
              >
                {item}
              </div>
            )
          )}
        </div>
      </div>
    ),
    size
  );
}
