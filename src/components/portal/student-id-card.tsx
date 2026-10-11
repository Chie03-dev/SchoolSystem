import { cn } from "@/lib/utils";
import { guardian, student } from "@/data/student";

const CELLS = 21;

/** Deterministic pseudo-QR matrix derived from the student ID string. */
function qrMatrix(value: string): boolean[][] {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  const rng = () => {
    hash = (Math.imul(hash, 1103515245) + 12345) >>> 0;
    return hash / 0xffffffff;
  };

  const grid: boolean[][] = Array.from({ length: CELLS }, () =>
    Array.from({ length: CELLS }, () => false)
  );

  for (let row = 0; row < CELLS; row++) {
    for (let col = 0; col < CELLS; col++) {
      grid[row][col] = rng() > 0.52;
    }
  }

  // Finder patterns (three corners) like a real QR.
  const finder = (startRow: number, startCol: number) => {
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 7; col++) {
        const edge = row === 0 || row === 6 || col === 0 || col === 6;
        const center = row >= 2 && row <= 4 && col >= 2 && col <= 4;
        grid[startRow + row][startCol + col] = edge || center;
      }
    }
  };
  finder(0, 0);
  finder(0, CELLS - 7);
  finder(CELLS - 7, 0);

  return grid;
}

export function StudentIdCard({ hologram = true }: { hologram?: boolean }) {
  const grid = qrMatrix(student.id);
  const cell = 4; // px
  const size = CELLS * cell;

  return (
    <div
      className={cn(
        "relative w-[19rem] overflow-hidden rounded-2xl bg-surface ring-1 ring-foreground/10",
        hologram && "id-hologram"
      )}
    >
      <div className="relative z-1">
        <div className="flex items-center justify-between bg-clay px-4 py-2.5 text-primary-foreground">
          <div>
            <p className="font-display text-sm leading-none font-semibold">
              {student.school}
            </p>
            <p className="mt-0.5 text-[10px] tracking-[0.12em] uppercase opacity-85">
              Digital student ID
            </p>
          </div>
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-md bg-primary-foreground/15 font-display text-sm font-semibold"
          >
            M
          </span>
        </div>

        <div className="flex gap-3 px-4 pt-3.5">
          <span
            aria-hidden
            className="grid size-16 shrink-0 place-items-center rounded-xl bg-clay/12 font-display text-xl font-semibold text-clay"
          >
            {student.firstName[0]}
            {student.lastName[0]}
          </span>
          <div className="min-w-0">
            <p className="font-display text-base leading-tight font-semibold">
              {student.firstName} {student.lastName}
            </p>
            <p className="mt-0.5 text-[11px] text-ink-muted">LRN {student.lrn}</p>
            <p className="text-[11px] text-ink-muted">
              {student.gradeLevel} · {student.strand} · {student.section}
            </p>
            <p className="mt-1 font-mono text-[11px] font-medium text-clay">{student.id}</p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-3 px-4 py-3.5">
          <dl className="space-y-1 text-[11px]">
            <div>
              <dt className="inline text-ink-faint">Emergency: </dt>
              <dd className="inline font-medium">{guardian.relationship} · {guardian.phone}</dd>
            </div>
            <div>
              <dt className="inline text-ink-faint">Blood type: </dt>
              <dd className="inline font-medium">{student.bloodType}</dd>
            </div>
            <div>
              <dt className="inline text-ink-faint">Valid through </dt>
              <dd className="inline font-medium">End of S.Y. 2026–2027</dd>
            </div>
          </dl>

          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            role="img"
            aria-label={`QR code for student ${student.id}`}
            className="shrink-0 rounded-md bg-surface p-1 ring-1 ring-hairline"
          >
            <rect width={size} height={size} fill="var(--surface)" />
            {grid.map((row, rowIndex) =>
              row.map((filled, colIndex) =>
                filled ? (
                  <rect
                    key={`${rowIndex}-${colIndex}`}
                    x={colIndex * cell}
                    y={rowIndex * cell}
                    width={cell}
                    height={cell}
                    rx={0.6}
                    fill="var(--ink)"
                  />
                ) : null
              )
            )}
          </svg>
        </div>

        <div className="flex items-center justify-between border-t border-hairline bg-surface-2/70 px-4 py-2">
          <p className="font-mono text-[10px] tracking-[0.2em] text-ink-muted">
            {student.id.replace(/-/g, "")}
          </p>
          <p className="text-[10px] text-ink-faint">Scan at gates & library</p>
        </div>
      </div>
    </div>
  );
}
