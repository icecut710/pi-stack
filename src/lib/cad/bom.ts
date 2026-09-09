import { FAN_SPECS, layout, type FanSize, type RackParams } from "./params";

export interface BomRow {
  item: string;
  spec: string;
  qty: number;
  group: "print" | "fastener" | "bought";
  notes: string;
}

export function buildBom(p: RackParams, fan: FanSize = p.fanSize): BomRow[] {
  const L = layout(p);
  const spec = FAN_SPECS[fan];
  const rod = L.rodLength;
  const spacerH = L.spacerH;

  return [
    { item: "Node tray 01", spec: `Printed, ${p.trayLength} × ${p.trayWidth} × ${p.trayThickness} mm`, qty: 1, group: "print", notes: "Ears, NODE 01" },
    { item: "Node tray 02", spec: `Printed, same plate`, qty: 1, group: "print", notes: "No ears, NODE 02" },
    { item: "Node tray 03", spec: `Printed, same plate`, qty: 1, group: "print", notes: "Ears, NODE 03" },
    { item: "Inter-tray spacer", spec: `Printed tube Ø ${p.spacerOd} × ${spacerH.toFixed(1)} mm`, qty: 8, group: "print", notes: "4 per gap × 2 gaps" },
    { item: "Lower spacer", spec: `Printed tube Ø ${p.spacerOd} × ${p.lowerSpacerH} mm`, qty: 4, group: "print", notes: "Base to NODE 01" },
    { item: "Base / expansion plate", spec: `Printed, ${p.trayLength} × ${p.trayWidth} × ${p.baseThickness} mm`, qty: 1, group: "print", notes: "4× M3 expansion, foot wells" },
    { item: "Knurled top cap", spec: `Printed Ø ${p.topCapOd} × ${p.topCapHeight} mm`, qty: 4, group: "print", notes: "Press-in M3 nut" },
    { item: `${fan} mm fan bracket`, spec: `Printed, 4-point, ${p.fanStandoff} mm standoff`, qty: 1, group: "print", notes: "Print only the size you will run" },

    { item: "M3 threaded rod", spec: `Cut to ${rod} mm (buy 100 mm, trim)`, qty: 4, group: "fastener", notes: "Stainless or zinc, DIN 975" },
    { item: "M3 hex nut", spec: "DIN 934, 5.5 mm AF", qty: 16, group: "fastener", notes: "4 base, 4 top caps, 4 fan, 4 spare/lock" },
    { item: "M3 washer", spec: "DIN 125", qty: 8, group: "fastener", notes: "Under base nuts + under top caps" },
    { item: "M3 × 16 mm pan head", spec: "Phillips or hex", qty: 4, group: "fastener", notes: "Fan bracket to tray ears" },

    { item: "M2.5 F-F brass standoff", spec: `${p.standoffHeight} mm female-female`, qty: 12, group: "fastener", notes: "4 per Pi, between tray and PCB" },
    { item: "M2.5 × 6 mm screw", spec: "Pan head, Phillips", qty: 12, group: "fastener", notes: "Tray underside into standoff" },
    { item: "M2.5 × 5 mm screw", spec: "Pan head, Phillips", qty: 12, group: "fastener", notes: "Through Pi into standoff" },

    { item: `${fan} mm fan`, spec: `${spec.size} × ${spec.size} × ${spec.thickness} mm, ${spec.screw} holes @ ${spec.holeSpacing} mm`, qty: 1, group: "bought", notes: fan === 30 ? "CanaKit stopgap" : "Prefer 5 V quiet fan, 80 mm long-term" },
    { item: `${spec.screw} fan screws`, spec: `${spec.screw} × 20 mm (80/60) or M3 × 12 (30)`, qty: 4, group: "fastener", notes: "Fan to bracket" },
    { item: "Rubber feet", spec: `Ø ${p.footDiameter} mm, 3 mm, adhesive`, qty: 4, group: "bought", notes: "Seat in base recesses" },
    { item: "Raspberry Pi 4 Model B", spec: "Bare board, no case", qty: 3, group: "bought", notes: "Heatsinks fitted" },
    { item: "Low-profile heatsink", spec: `≤ ${p.heatsinkSize} × ${p.heatsinkHeight} mm on SoC`, qty: 3, group: "bought", notes: "Check height vs board pitch" },
    { item: "USB-C 5 V 3 A PSU", spec: "Official or equivalent", qty: 3, group: "bought", notes: "Or a 3-way USB-C PD hub in the expansion bay" },
    { item: "Gigabit Ethernet", spec: "Cat5e/Cat6 patch, 0.3–1 m", qty: 3, group: "bought", notes: "Service loop at rear" },
    { item: "Velcro cable ties", spec: "10 mm reusable", qty: 12, group: "bought", notes: "Rear tray slots" },
  ];
}

export function rodCutList(p: RackParams) {
  const L = layout(p);
  return {
    buy: "M3 × 100 mm threaded rod × 4",
    cutTo: `${L.rodLength} mm`,
    stack:
      `${p.footProtrude} (feet) + ${p.baseThickness} (base) + ${p.lowerSpacerH} (lower) + 3×${p.trayThickness} (trays) + 2×${L.spacerH.toFixed(1)} (spacers) + ${p.topCapHeight} (cap) ≈ ${L.rodLength} mm including nut engagement`,
  };
}
