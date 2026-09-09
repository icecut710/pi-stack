import * as THREE from "three";
import { forEachGlyphCell } from "./font";
import {
  FAN_SPECS,
  NODE_LABELS,
  layout,
  type FanSize,
  type RackParams,
} from "./params";
import {
  box,
  circleHole,
  cyl,
  extrude,
  hexHole,
  mergeGeos,
  roundedRectShape,
  stadiumHole,
  tube,
} from "./shapes";

function airflowSlots(p: RackParams): THREE.Path[] {
  const holes: THREE.Path[] = [];
  const y0 = p.piOffsetY + p.piHoleInsetY + 6.5;
  const y1 = p.piOffsetY + p.piHoleInsetY + p.piHoleSpacingY - 6.5;
  const slotLen = Math.max(18, y1 - y0);
  const slotCy = (y0 + y1) / 2;

  const xFront = p.piOffsetX + p.piHoleInsetX + 7;
  const xRearHole = p.piOffsetX + p.piHoleInsetX + p.piHoleSpacingX;
  const xBack = p.piOffsetX + p.piLength - 7;
  const between0 = xFront;
  const between1 = xRearHole - 7;
  const nBetween = Math.max(3, p.slotCount - 1);
  const span = between1 - between0;
  const step = nBetween === 1 ? 0 : span / (nBetween - 1);

  for (let i = 0; i < nBetween; i++) {
    const cx = nBetween === 1 ? (between0 + between1) / 2 : between0 + i * step;
    holes.push(stadiumHole(cx, slotCy, slotLen, p.slotWidth, "y"));
  }

  const rearCx = (xRearHole + 7 + xBack) / 2;
  if (xBack - (xRearHole + 7) > p.slotWidth + 4) {
    holes.push(stadiumHole(rearCx, slotCy, slotLen, p.slotWidth, "y"));
  }
  return holes;
}

function cableTieHoles(p: RackParams): THREE.Path[] {
  const L = layout(p);
  const cx = p.trayLength - L.rearMargin / 2;
  const ys = [p.piOffsetY + 12, p.trayWidth / 2, p.piOffsetY + p.piWidth - 12];
  return ys.map((cy) => stadiumHole(cx, cy, p.tieSlotLength, p.tieSlotWidth, "y"));
}

function sdScoop(p: RackParams): THREE.Path {
  const sdY = p.piOffsetY + 22.15 + 6;
  return stadiumHole(5.5, sdY, 16, 9, "y");
}

function trayPlateShape(p: RackParams): THREE.Shape {
  const L = layout(p);
  const s = roundedRectShape(p.trayLength, p.trayWidth, p.trayCornerRadius);
  for (const [x, y] of L.rodXY) s.holes.push(circleHole(x, y, p.m3Clearance));
  for (const [x, y] of L.piHoles) s.holes.push(circleHole(x, y, p.m25Clearance));
  for (const h of airflowSlots(p)) s.holes.push(h);
  for (const h of cableTieHoles(p)) s.holes.push(h);
  s.holes.push(sdScoop(p));
  return s;
}

function labelGeom(text: string, p: RackParams): THREE.BufferGeometry {
  const geos: THREE.BufferGeometry[] = [];
  forEachGlyphCell(text, p.labelHeight, (x, y, w, h) => {
    geos.push(box(w, h, p.labelDepth, x + w / 2, y + h / 2, p.labelDepth / 2));
  });
  if (geos.length === 0) return new THREE.BufferGeometry();
  const g = mergeGeos(geos);
  g.rotateZ(0);
  g.translate(p.trayLength / 2, p.trayWidth - 4.6, p.trayThickness);
  return g;
}

function bosses(p: RackParams): THREE.BufferGeometry {
  const L = layout(p);
  const geos = L.rodXY.map(([x, y]) =>
    tube(
      p.bossDiameter / 2,
      p.m3Clearance / 2,
      p.bossHeight,
      x,
      y,
      p.trayThickness,
      "z",
    ),
  );
  const collars = L.rodXY.map(([x, y]) => {
    const s = roundedRectShape(p.bossDiameter + 2.4, p.bossDiameter + 2.4, 2.4, -p.bossDiameter / 2 - 1.2, -p.bossDiameter / 2 - 1.2);
    s.holes.push(circleHole(0, 0, p.m3Clearance));
    const g = extrude(s, 0.9);
    g.translate(x, y, p.trayThickness);
    return g;
  });
  return mergeGeos([...geos, ...collars]);
}

function earPair(p: RackParams): THREE.BufferGeometry {
  const L = layout(p);
  const parts: THREE.BufferGeometry[] = [];
  const zH = p.earThickness;
  const nutAf = p.m3NutAf + p.printTolerance * 2 + 0.3;

  for (const x of L.earX) {
    const outer = roundedRectShape(p.earWidth, zH, 1.1, -p.earWidth / 2, 0);
    outer.holes.push(circleHole(0, zH / 2, p.m3Clearance));
    const og = extrude(outer, 2.4);
    og.rotateX(Math.PI / 2);
    og.translate(x, 0, 0);

    const inner = roundedRectShape(p.earWidth, zH, 1.1, -p.earWidth / 2, 0);
    inner.holes.push(hexHole(0, zH / 2, nutAf));
    const ig = extrude(inner, p.earProtrude - 2.4);
    ig.rotateX(Math.PI / 2);
    ig.translate(x, -2.4, 0);

    const gusset = new THREE.Shape();
    gusset.moveTo(-3.2, 0);
    gusset.lineTo(3.2, 0);
    gusset.lineTo(1.4, -p.earProtrude + 1);
    gusset.lineTo(-1.4, -p.earProtrude + 1);
    gusset.closePath();
    const gg = extrude(gusset, 1.6);
    gg.translate(x, 0, 0.2);

    parts.push(og, ig, gg);
  }
  return mergeGeos(parts);
}

export function buildTray(
  p: RackParams,
  label: string,
  withEars: boolean,
): THREE.BufferGeometry {
  const plate = extrude(trayPlateShape(p), p.trayThickness);
  const boss = bosses(p);
  const text = labelGeom(label, p);
  const parts = [plate, boss, text];
  if (withEars) parts.push(earPair(p));
  return mergeGeos(parts);
}

export function buildSpacer(p: RackParams, height: number): THREE.BufferGeometry {
  const outer = p.spacerOd / 2;
  const inner = p.m3Clearance / 2;
  const body = tube(outer, inner, height, 0, 0, 0, "z");
  // slight chamfer rings
  const chamfer = tube(outer - 0.15, inner, 0.4, 0, 0, height - 0.4, "z");
  return mergeGeos([body, chamfer]);
}

export function buildBase(p: RackParams): THREE.BufferGeometry {
  const L = layout(p);
  const s = roundedRectShape(p.trayLength, p.trayWidth, p.trayCornerRadius);
  for (const [x, y] of L.rodXY) {
    s.holes.push(circleHole(x, y, p.m3Clearance));
  }
  // expansion interface: 48 × 32 mm M3 pattern, centred
  const exp = expansionHoles(p);
  for (const [x, y] of exp) s.holes.push(circleHole(x, y, p.m3Clearance));
  // drainage / cable slots
  s.holes.push(stadiumHole(p.trayLength / 2, p.trayWidth / 2 + 18, 28, 8, "x"));
  s.holes.push(stadiumHole(p.trayLength / 2, p.trayWidth / 2 - 18, 28, 8, "x"));

  const plate = extrude(s, p.baseThickness);

  const feetWells: THREE.BufferGeometry[] = [];
  // raised register collars around rod holes (top)
  const collars = L.rodXY.map(([x, y]) =>
    tube(p.spacerOd / 2 + 0.4, p.m3Clearance / 2, 0.8, x, y, p.baseThickness, "z"),
  );

  // expansion label as a shallow recess is skipped; raised "EXP" block letters
  const expLabel = labelGeom("NODE", { ...p, labelHeight: 4.2, labelDepth: 0.45 });
  expLabel.translate(0, -p.trayWidth / 2 + 9, p.baseThickness - p.trayThickness);

  // nut counterbores on the bottom as extra rings (visual / seating)
  const nutRings = L.rodXY.map(([x, y]) =>
    tube(4.2, p.m3Clearance / 2, 0.6, x, y, 0, "z"),
  );

  // foot recess rings on bottom corners
  for (const [x, y] of L.rodXY) {
    const fx = x < p.trayLength / 2 ? 11 : p.trayLength - 11;
    const fy = y < p.trayWidth / 2 ? 11 : p.trayWidth - 11;
    feetWells.push(tube(p.footDiameter / 2 + 0.8, p.footDiameter / 2 - 0.6, 0.5, fx, fy, 0, "z"));
  }

  return mergeGeos([plate, ...collars, ...nutRings, ...feetWells]);
}

export function expansionHoles(p: RackParams): [number, number][] {
  const cx = p.trayLength / 2;
  const cy = p.trayWidth / 2;
  const dx = 24;
  const dy = 16;
  return [
    [cx - dx, cy - dy],
    [cx + dx, cy - dy],
    [cx - dx, cy + dy],
    [cx + dx, cy + dy],
  ];
}

export function buildTopCap(p: RackParams): THREE.BufferGeometry {
  const nutAf = p.m3NutAf + p.printTolerance * 2 + 0.25;
  const s = new THREE.Shape();
  s.absarc(0, 0, p.topCapOd / 2, 0, Math.PI * 2, false);
  s.holes.push(circleHole(0, 0, p.m3Clearance));
  const body = extrude(s, p.topCapHeight);

  // knurl: 16 radial ribs
  const ribs: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const g = box(0.9, 1.1, p.topCapHeight - 1.2, 0, 0, (p.topCapHeight - 1.2) / 2 + 0.4);
    g.rotateZ(a);
    g.translate(Math.cos(a) * (p.topCapOd / 2 - 0.15), Math.sin(a) * (p.topCapOd / 2 - 0.15), 0);
    ribs.push(g);
  }

  // hex nut pocket from the top, 2.8 mm deep — modelled as a second layer with hex hole
  const top = new THREE.Shape();
  top.absarc(0, 0, p.topCapOd / 2 - 1.2, 0, Math.PI * 2, false);
  top.holes.push(hexHole(0, 0, nutAf));
  // We can't easily subtract; leave the through hole circular. Knurl provides grip.
  return mergeGeos([body, ...ribs]);
}

function fanPlateShape(p: RackParams, size: FanSize): THREE.Shape {
  const spec = FAN_SPECS[size];
  const L = layout(p);
  const plateW = p.trayLength; // X
  const plateH = Math.max(spec.size + 10, L.fanMountZ[1] - L.fanMountZ[0] + 18);
  const s = roundedRectShape(plateW, plateH, 5, 0, 0);

  const fanCx = plateW / 2;
  const fanCy = plateH / 2;
  s.holes.push(circleHole(fanCx, fanCy, spec.cutout));

  const hs = spec.holeSpacing / 2;
  for (const dx of [-hs, hs]) {
    for (const dy of [-hs, hs]) {
      s.holes.push(circleHole(fanCx + dx, fanCy + dy, spec.holeDia));
    }
  }

  // 4 rack mount holes — local plate coords. Plate z maps to assembly Z, x to tray X.
  const mountY0 = (plateH - (L.fanMountZ[1] - L.fanMountZ[0])) / 2;
  const mountY1 = mountY0 + (L.fanMountZ[1] - L.fanMountZ[0]);
  s.holes.push(circleHole(L.earX[0], mountY0, p.m3Clearance));
  s.holes.push(circleHole(L.earX[1], mountY0, p.m3Clearance));
  s.holes.push(circleHole(L.earX[0], mountY1, p.m3Clearance));
  s.holes.push(circleHole(L.earX[1], mountY1, p.m3Clearance));

  // lightening / drainage slots left and right of the fan if there is room
  if (plateW > spec.size + 28) {
    const side = (plateW - spec.cutout) / 4;
    s.holes.push(stadiumHole(side, fanCy, plateH * 0.42, 8, "y"));
    s.holes.push(stadiumHole(plateW - side, fanCy, plateH * 0.42, 8, "y"));
  }
  return s;
}

function fanPosts(p: RackParams, size: FanSize): THREE.BufferGeometry {
  const spec = FAN_SPECS[size];
  const L = layout(p);
  const plateH = Math.max(spec.size + 10, L.fanMountZ[1] - L.fanMountZ[0] + 18);
  const mountY0 = (plateH - (L.fanMountZ[1] - L.fanMountZ[0])) / 2;
  const mountY1 = mountY0 + (L.fanMountZ[1] - L.fanMountZ[0]);
  const posts: THREE.BufferGeometry[] = [];
  const coords: [number, number][] = [
    [L.earX[0], mountY0],
    [L.earX[1], mountY0],
    [L.earX[0], mountY1],
    [L.earX[1], mountY1],
  ];
  const postW = 8.2;
  for (const [x, y] of coords) {
    const s = roundedRectShape(postW, postW, 1.4, -postW / 2, -postW / 2);
    s.holes.push(circleHole(0, 0, p.m3Clearance));
    const g = extrude(s, p.fanStandoff);
    g.translate(x, y, p.fanPlateThickness);
    posts.push(g);

    // triangular gusset at the plate joint (two fins)
    const gus = new THREE.Shape();
    gus.moveTo(-3.6, 0);
    gus.lineTo(3.6, 0);
    gus.lineTo(0, 9);
    gus.closePath();
    const g1 = extrude(gus, 2.2);
    g1.rotateX(Math.PI / 2);
    g1.translate(x, y, p.fanPlateThickness);
    posts.push(g1);
  }
  return mergeGeos(posts);
}

export function buildFanBracket(p: RackParams, size: FanSize): THREE.BufferGeometry {
  const plate = extrude(fanPlateShape(p, size), p.fanPlateThickness);
  const posts = fanPosts(p, size);
  // thicker pads around the 4 mount holes
  const spec = FAN_SPECS[size];
  const L = layout(p);
  const plateH = Math.max(spec.size + 10, L.fanMountZ[1] - L.fanMountZ[0] + 18);
  const mountY0 = (plateH - (L.fanMountZ[1] - L.fanMountZ[0])) / 2;
  const mountY1 = mountY0 + (L.fanMountZ[1] - L.fanMountZ[0]);
  const pads = [mountY0, mountY1].flatMap((y) =>
    L.earX.map((x) => tube(6.2, p.m3Clearance / 2, 1.6, x, y, p.fanPlateThickness, "z")),
  );
  return mergeGeos([plate, posts, ...pads]);
}

export function fanPlateSize(p: RackParams, size: FanSize) {
  const spec = FAN_SPECS[size];
  const L = layout(p);
  const plateW = p.trayLength;
  const plateH = Math.max(spec.size + 10, L.fanMountZ[1] - L.fanMountZ[0] + 18);
  return { plateW, plateH, spec };
}

export function buildRod(p: RackParams): THREE.BufferGeometry {
  const L = layout(p);
  return cyl(1.45, L.rodLength, 0, 0, L.rodLength / 2, "z", 12);
}

export function buildStandoff(p: RackParams): THREE.BufferGeometry {
  return tube(2.25, 1.15, p.standoffHeight, 0, 0, 0, "z");
}

export function buildNut(af: number, th: number): THREE.BufferGeometry {
  const s = new THREE.Shape();
  const rv = af / Math.sqrt(3);
  for (let i = 0; i <= 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const x = rv * Math.cos(a);
    const y = rv * Math.sin(a);
    if (i === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  s.closePath();
  s.holes.push(circleHole(0, 0, 3.1));
  return extrude(s, th, 6);
}

export const PRINTABLE: {
  id: import("./params").PartId;
  name: string;
  qty: number;
  notes: string;
}[] = [
  { id: "tray-01", name: "Node tray 01", qty: 1, notes: "Blue — ears + NODE 01" },
  { id: "tray-02", name: "Node tray 02", qty: 1, notes: "Green — no ears" },
  { id: "tray-03", name: "Node tray 03", qty: 1, notes: "Red — ears + NODE 03" },
  { id: "spacer", name: "Inter-tray spacer", qty: 8, notes: "Tube, print standing" },
  { id: "lower-spacer", name: "Lower spacer", qty: 4, notes: "Base to NODE 01" },
  { id: "base", name: "Base / expansion plate", qty: 1, notes: "Feet + M3 expansion" },
  { id: "top-cap", name: "Knurled top cap", qty: 4, notes: "Tool-free stack lift" },
  { id: "fan-30", name: "30 mm fan adapter", qty: 1, notes: "CanaKit temporary" },
  { id: "fan-60", name: "60 mm fan bracket", qty: 1, notes: "Quiet long-term" },
  { id: "fan-80", name: "80 mm fan bracket", qty: 1, notes: "Preferred cooling" },
];

export function buildPrintable(p: RackParams, id: import("./params").PartId): THREE.BufferGeometry {
  switch (id) {
    case "tray-01":
      return buildTray(p, NODE_LABELS[0], true);
    case "tray-02":
      return buildTray(p, NODE_LABELS[1], false);
    case "tray-03":
      return buildTray(p, NODE_LABELS[2], true);
    case "spacer":
      return buildSpacer(p, layout(p).spacerH);
    case "lower-spacer":
      return buildSpacer(p, p.lowerSpacerH);
    case "base":
      return buildBase(p);
    case "top-cap":
      return buildTopCap(p);
    case "fan-30":
      return buildFanBracket(p, 30);
    case "fan-60":
      return buildFanBracket(p, 60);
    case "fan-80":
      return buildFanBracket(p, 80);
  }
}

export function partBBox(geo: THREE.BufferGeometry) {
  geo.computeBoundingBox();
  const b = geo.boundingBox!;
  const size = new THREE.Vector3();
  b.getSize(size);
  return { w: size.x, d: size.y, h: size.z, min: b.min.clone(), max: b.max.clone() };
}
