import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Marben — the student portal your school can call its own";

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
              background: "#B4552D",
              color: "#FFF8F2",
              fontSize: 36,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            M
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, color: "#1C1917" }}>
            Marben
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
            student ID — one calm, offline-friendly portal for Philippine
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
