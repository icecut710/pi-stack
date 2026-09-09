import {
  Check,
  AlertTriangle,
  XCircle,
  Download,
  Copy,
  RotateCcw,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { buildBom, rodCutList } from "@/lib/cad/bom";
import { ASSEMBLE_STEPS, DESIGN_NOTES, PRINT_GUIDE } from "@/lib/cad/docs";
import { PRINTABLE } from "@/lib/cad/geometry";
import { buildOpenScad } from "@/lib/cad/openscad";
import { PARAM_META, layout } from "@/lib/cad/params";
import { useCad, type InspectorTab } from "@/lib/cad/store";
import { summary, validate } from "@/lib/cad/validate";
import { buildZip, stlBlob } from "@/lib/cad/export";
import { buildPrintable } from "@/lib/cad/geometry";
import { downloadBlob, mm } from "@/lib/utils";
import { cn } from "@/lib/utils";

const TABS: { id: InspectorTab; label: string }[] = [
  { id: "params", label: "Params" },
  { id: "bom", label: "BOM" },
  { id: "assemble", label: "Assemble" },
  { id: "print", label: "Print" },
  { id: "validate", label: "Validate" },
  { id: "source", label: "Source" },
];

export function Inspector() {
  const tab = useCad((s) => s.inspector);
  const setTab = useCad((s) => s.setInspector);
  return (
    <aside className="flex h-full min-h-0 flex-col border-l border-border bg-surface">
      <div className="flex gap-0.5 overflow-x-auto border-b border-border px-2 py-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium",
              tab === t.id ? "bg-secondary text-fg" : "text-muted hover:text-fg",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <div className="p-4">
          {tab === "params" && <ParamsPanel />}
          {tab === "bom" && <BomPanel />}
          {tab === "assemble" && <AssemblePanel />}
          {tab === "print" && <PrintPanel />}
          {tab === "validate" && <ValidatePanel />}
          {tab === "source" && <SourcePanel />}
        </div>
      </ScrollArea>
    </aside>
  );
}

function ParamsPanel() {
  const params = useCad((s) => s.params);
  const setParam = useCad((s) => s.setParam);
  const reset = useCad((s) => s.reset);
  const groups = [...new Set(PARAM_META.map((m) => m.group))];
  const L = layout(params);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium">Parameters</h2>
          <p className="mt-1 text-xs text-muted">
            Official Pi 4B holes stay at 58 × 49 mm unless you deliberately change them.
          </p>
        </div>
        <Button size="sm" variant="ghost" onClick={reset}>
          <RotateCcw />
          Reset
        </Button>
      </div>
      <dl className="grid grid-cols-2 gap-2 rounded-lg bg-bg p-3 text-xs">
        <div>
          <dt className="text-subtle">Spacer</dt>
          <dd className="font-mono tabular-nums text-fg">{mm(L.spacerH)}</dd>
        </div>
        <div>
          <dt className="text-subtle">Rod</dt>
          <dd className="font-mono tabular-nums text-fg">{L.rodLength} mm</dd>
        </div>
        <div>
          <dt className="text-subtle">Envelope</dt>
          <dd className="font-mono tabular-nums text-fg">
            {L.overallDepth.toFixed(0)} × {L.overallWidth.toFixed(0)} × {L.overallHeight.toFixed(0)}
          </dd>
        </div>
        <div>
          <dt className="text-subtle">Rear lip</dt>
          <dd className="font-mono tabular-nums text-fg">{mm(L.rearMargin)}</dd>
        </div>
      </dl>
      {groups.map((g) => (
        <section key={g} className="flex flex-col gap-3">
          <h3 className="text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">{g}</h3>
          {PARAM_META.filter((m) => m.group === g).map((m) => {
            const value = Number(params[m.key]);
            return (
              <label key={m.key} className="flex flex-col gap-1.5">
                <span className="flex items-baseline justify-between text-xs">
                  <span className="text-fg">{m.label}</span>
                  <span className="font-mono tabular-nums text-muted">
                    {value.toFixed(m.step < 1 ? 2 : 1)}
                    {m.unit ? ` ${m.unit}` : ""}
                  </span>
                </span>
                <input
                  type="range"
                  min={m.min}
                  max={m.max}
                  step={m.step}
                  value={value}
                  onChange={(e) => setParam(m.key, Number(e.target.value) as never)}
                  className="h-8 w-full accent-fg"
                />
              </label>
            );
          })}
        </section>
      ))}
    </div>
  );
}

function BomPanel() {
  const params = useCad((s) => s.params);
  const fan = useCad((s) => s.fan);
  const rows = useMemo(() => buildBom(params, fan), [params, fan]);
  const cut = rodCutList(params);
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-medium">Bill of materials</h2>
        <p className="mt-1 text-xs text-muted">
          Cut list: buy {cut.buy}, cut each rod to {cut.cutTo}.
        </p>
      </div>
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="text-subtle">
            <th className="pb-2 font-medium">Qty</th>
            <th className="pb-2 font-medium">Item</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.item} className="border-t border-border align-top">
              <td className="py-2 pr-2 font-mono tabular-nums">{r.qty}</td>
              <td className="py-2">
                <div className="text-fg">{r.item}</div>
                <div className="text-muted">{r.spec}</div>
                <div className="text-subtle">{r.notes}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AssemblePanel() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-medium">Assembly</h2>
      <ol className="flex flex-col gap-4">
        {ASSEMBLE_STEPS.map((s, i) => (
          <li key={s.title} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-[11px] tabular-nums">
              {i + 1}
            </span>
            <div>
              <h3 className="text-sm font-medium">{s.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <ul className="flex flex-col gap-2 border-t border-border pt-4">
        {DESIGN_NOTES.map((n) => (
          <li key={n} className="text-xs leading-relaxed text-muted">
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PrintPanel() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-medium">Resin print — Photon Mono 2</h2>
        <p className="mt-1 text-xs text-muted">
          Comfortable envelope {PRINT_GUIDE.printer.comfortableX} × {PRINT_GUIDE.printer.comfortableY} ×{" "}
          {PRINT_GUIDE.printer.comfortableZ} mm. {PRINT_GUIDE.resin} Layer {PRINT_GUIDE.layer}
        </p>
      </div>
      <section>
        <h3 className="text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">Test print first</h3>
        <ol className="mt-2 flex flex-col gap-1.5">
          {PRINT_GUIDE.testPrint.map((s, i) => (
            <li key={s} className="flex gap-2 text-xs leading-relaxed text-muted">
              <span className="font-mono tabular-nums text-subtle">{i + 1}.</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </section>
      {PRINT_GUIDE.orientations.map((o) => (
        <section key={o.part} className="rounded-lg bg-bg p-3">
          <h3 className="text-sm font-medium">{o.part}</h3>
          <p className="mt-1 text-xs text-muted">{o.orient}</p>
          <p className="mt-1 text-xs text-muted">Supports: {o.supports}</p>
          <p className="mt-1 text-xs text-subtle">{o.notes}</p>
        </section>
      ))}
      <section>
        <h3 className="text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">Wash & cure</h3>
        <ul className="mt-2 flex flex-col gap-1.5">
          {PRINT_GUIDE.washCure.map((s) => (
            <li key={s} className="text-xs leading-relaxed text-muted">
              {s}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ValidatePanel() {
  const params = useCad((s) => s.params);
  const checks = useMemo(() => validate(params), [params]);
  const s = summary(checks);
  const Icon = { pass: Check, warn: AlertTriangle, fail: XCircle };
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-medium">Mechanical validation</h2>
        <p className="mt-1 font-mono text-xs tabular-nums text-muted">
          {s.pass} pass · {s.warn} warn · {s.fail} fail · {s.total} checks
        </p>
      </div>
      {checks.map((c) => {
        const I = Icon[c.severity];
        return (
          <div key={c.id} className="flex gap-2.5">
            <I
              className={cn(
                "mt-0.5 size-3.5 shrink-0",
                c.severity === "pass" && "text-ok",
                c.severity === "warn" && "text-warn",
                c.severity === "fail" && "text-danger",
              )}
            />
            <div>
              <div className="text-xs font-medium">
                {c.name}
                <span className="ml-2 font-normal text-subtle">{c.group}</span>
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">{c.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SourcePanel() {
  const params = useCad((s) => s.params);
  const scad = useMemo(() => buildOpenScad(params), [params]);
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">OpenSCAD source</h2>
        <Button
          size="sm"
          variant="outline"
          onClick={async () => {
            await navigator.clipboard.writeText(scad);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
        >
          <Copy />
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <p className="text-xs text-muted">
        Customizer-ready. Set <span className="font-mono">part</span> to export a single STL. Pi reference geometry is
        preview-only.
      </p>
      <pre className="max-h-[28rem] overflow-auto rounded-lg bg-bg p-3 font-mono text-[10px] leading-relaxed text-muted">
        {scad}
      </pre>
    </div>
  );
}

export function ExportMenu() {
  const params = useCad((s) => s.params);
  const part = useCad((s) => s.part);
  const [busy, setBusy] = useState(false);

  async function zip() {
    setBusy(true);
    try {
      const blob = await buildZip(params);
      downloadBlob(blob, "noderack-pi4-cluster.zip");
    } finally {
      setBusy(false);
    }
  }

  function one() {
    const geo = buildPrintable(params, part);
    downloadBlob(stlBlob(geo, part), `noderack-${part}.stl`);
    geo.dispose();
  }

  function scad() {
    const text = buildOpenScad(params);
    downloadBlob(new Blob([text], { type: "text/plain" }), "noderack.scad");
  }

  return (
    <div className="flex items-center gap-1.5">
      <Button size="sm" onClick={() => void zip()} disabled={busy}>
        <Download />
        {busy ? "Packing…" : "ZIP all"}
      </Button>
      <Button size="sm" variant="outline" onClick={one}>
        STL
      </Button>
      <Button size="sm" variant="outline" onClick={scad}>
        SCAD
      </Button>
    </div>
  );
}

export function PartRail() {
  const part = useCad((s) => s.part);
  const setPart = useCad((s) => s.setPart);
  const view = useCad((s) => s.view);
  const setView = useCad((s) => s.setView);
  return (
    <div className="flex flex-col gap-1 p-2">
      {PRINTABLE.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => setPart(p.id)}
          className={cn(
            "rounded-md px-2 py-2 text-left text-xs",
            view === "part" && part === p.id ? "bg-secondary text-fg" : "text-muted hover:text-fg",
          )}
        >
          <div className="font-medium">{p.name}</div>
          <div className="text-[10px] text-subtle">
            ×{p.qty} · {p.notes}
          </div>
        </button>
      ))}
      <button
        type="button"
        onClick={() => setView("assembled")}
        className="mt-1 rounded-md px-2 py-2 text-left text-xs text-muted hover:text-fg"
      >
        Back to assembly
      </button>
    </div>
  );
}
