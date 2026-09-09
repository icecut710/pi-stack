import { lazy, Suspense } from "react";
import { Box, Cpu, Eye, EyeOff, Fan, Grid3x3, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExportMenu, Inspector, PartRail } from "@/components/studio/inspector";
import { useCad } from "@/lib/cad/store";
import { cn } from "@/lib/utils";

const Viewer = lazy(() => import("@/components/studio/viewer").then((m) => ({ default: m.Viewer })));

const VIEWS = [
  { id: "assembled" as const, label: "Assembled" },
  { id: "exploded" as const, label: "Exploded" },
  { id: "part" as const, label: "Part" },
];

const FANS = [30, 60, 80] as const;

export function StudioShell() {
  const view = useCad((s) => s.view);
  const setView = useCad((s) => s.setView);
  const fan = useCad((s) => s.fan);
  const setFan = useCad((s) => s.setFan);
  const showPi = useCad((s) => s.showPi);
  const showFan = useCad((s) => s.showFan);
  const showHardware = useCad((s) => s.showHardware);
  const showGrid = useCad((s) => s.showGrid);
  const toggle = useCad((s) => s.toggle);
  const explode = useCad((s) => s.explode);
  const setExplode = useCad((s) => s.setExplode);
  const showHeatsink = useCad((s) => s.showHeatsink);

  return (
    <div className="flex h-dvh min-h-0 flex-col bg-bg text-fg">
      <header className="flex flex-wrap items-center gap-3 border-b border-border px-3 py-2.5 md:px-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-surface ring-1 ring-border">
            <Layers className="size-4" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-medium tracking-tight">NodeRack</div>
            <div className="text-[11px] text-muted">Pi 4B · 3-node · Photon Mono 2</div>
          </div>
        </div>

        <div className="flex rounded-lg bg-surface p-0.5 ring-1 ring-border">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setView(v.id)}
              className={cn(
                "h-8 rounded-md px-3 text-xs font-medium",
                view === v.id ? "bg-secondary text-fg" : "text-muted hover:text-fg",
              )}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-surface p-0.5 ring-1 ring-border">
          {FANS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFan(f)}
              className={cn(
                "h-8 rounded-md px-2.5 font-mono text-xs tabular-nums",
                fan === f ? "bg-secondary text-fg" : "text-muted hover:text-fg",
              )}
            >
              {f}
            </button>
          ))}
          <span className="pr-2 text-[10px] text-subtle">mm fan</span>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-1">
          <IconToggle pressed={showPi} onClick={() => toggle("showPi")} label="Pi boards">
            <Box />
          </IconToggle>
          <IconToggle pressed={showHeatsink} onClick={() => toggle("showHeatsink")} label="Heatsinks">
            <Cpu />
          </IconToggle>
          <IconToggle pressed={showFan} onClick={() => toggle("showFan")} label="Fan bracket">
            <Fan />
          </IconToggle>
          <IconToggle pressed={showHardware} onClick={() => toggle("showHardware")} label="Hardware">
            {showHardware ? <Eye /> : <EyeOff />}
          </IconToggle>
          <IconToggle pressed={showGrid} onClick={() => toggle("showGrid")} label="Grid">
            <Grid3x3 />
          </IconToggle>
          <ExportMenu />
        </div>
      </header>

      {view === "exploded" && (
        <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-2">
          <span className="text-[11px] uppercase tracking-[0.14em] text-subtle">Explode</span>
          <input
            type="range"
            min={0}
            max={40}
            step={1}
            value={explode}
            onChange={(e) => setExplode(Number(e.target.value))}
            className="h-8 max-w-xs flex-1 accent-fg"
          />
          <span className="font-mono text-xs tabular-nums text-muted">{explode} mm</span>
        </div>
      )}

      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[168px_minmax(0,1fr)_minmax(280px,360px)]">
        <nav className="hidden min-h-0 border-r border-border bg-surface md:flex md:flex-col">
          <div className="px-3 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">
            Printable parts
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <PartRail />
          </div>
        </nav>
        <main className="relative min-h-[46vh] bg-bg md:min-h-0">
          <Suspense fallback={<div className="h-full w-full bg-bg" />}>
            <Viewer />
          </Suspense>
          <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-surface/80 px-2 py-1 text-[10px] text-muted ring-1 ring-border backdrop-blur-sm">
            Drag to orbit · scroll to zoom · Pi boards are preview-only
          </div>
        </main>
        <div className="min-h-0 border-t border-border md:border-t-0">
          <Inspector />
        </div>
      </div>
    </div>
  );
}

function IconToggle({
  pressed,
  onClick,
  label,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      size="icon"
      variant={pressed ? "secondary" : "ghost"}
      aria-pressed={pressed}
      aria-label={label}
      title={label}
      onClick={onClick}
      className="size-9"
    >
      {children}
    </Button>
  );
}
