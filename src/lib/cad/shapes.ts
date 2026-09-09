import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

export const SEG = 20;

export function mergeGeos(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if (geos.length === 0) return new THREE.BufferGeometry();
  if (geos.length === 1) {
    const g = geos[0]!.clone();
    g.computeVertexNormals();
    return g;
  }
  const cleaned = geos.map((g) => {
    const c = g.clone();
    c.deleteAttribute("uv");
    c.deleteAttribute("uv1");
    c.deleteAttribute("uv2");
    if (!c.getAttribute("normal")) c.computeVertexNormals();
    return c;
  });
  const merged = mergeGeometries(cleaned, false);
  for (const c of cleaned) c.dispose();
  if (!merged) {
    const fallback = geos[0]!.clone();
    fallback.computeVertexNormals();
    return fallback;
  }
  merged.computeVertexNormals();
  return merged;
}

export function roundedRectShape(
  w: number,
  h: number,
  r: number,
  ox = 0,
  oy = 0,
): THREE.Shape {
  const rr = Math.max(0.2, Math.min(r, w / 2 - 0.05, h / 2 - 0.05));
  const s = new THREE.Shape();
  const x0 = ox;
  const y0 = oy;
  const x1 = ox + w;
  const y1 = oy + h;
  s.moveTo(x0 + rr, y0);
  s.lineTo(x1 - rr, y0);
  s.absarc(x1 - rr, y0 + rr, rr, -Math.PI / 2, 0, false);
  s.lineTo(x1, y1 - rr);
  s.absarc(x1 - rr, y1 - rr, rr, 0, Math.PI / 2, false);
  s.lineTo(x0 + rr, y1);
  s.absarc(x0 + rr, y1 - rr, rr, Math.PI / 2, Math.PI, false);
  s.lineTo(x0, y0 + rr);
  s.absarc(x0 + rr, y0 + rr, rr, Math.PI, Math.PI * 1.5, false);
  return s;
}

export function circleHole(cx: number, cy: number, d: number): THREE.Path {
  const p = new THREE.Path();
  p.absarc(cx, cy, d / 2, 0, Math.PI * 2, true);
  return p;
}

export function hexHole(cx: number, cy: number, af: number): THREE.Path {
  const rv = af / Math.sqrt(3);
  const p = new THREE.Path();
  for (let i = 0; i <= 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const x = cx + rv * Math.cos(a);
    const y = cy + rv * Math.sin(a);
    if (i === 0) p.moveTo(x, y);
    else p.lineTo(x, y);
  }
  p.closePath();
  return p;
}

/** Stadium / obround hole. `along` is the long axis. Winding is CW for Shape holes. */
export function stadiumHole(
  cx: number,
  cy: number,
  length: number,
  width: number,
  along: "x" | "y",
): THREE.Path {
  const p = new THREE.Path();
  const r = width / 2;
  const d = Math.max(0, (length - width) / 2);
  if (along === "x") {
    p.absarc(cx + d, cy, r, Math.PI / 2, -Math.PI / 2, true);
    p.absarc(cx - d, cy, r, -Math.PI / 2, Math.PI / 2, true);
  } else {
    p.absarc(cx, cy + d, r, 0, Math.PI, true);
    p.absarc(cx, cy - d, r, Math.PI, 0, true);
  }
  return p;
}

export function extrude(
  shape: THREE.Shape,
  depth: number,
  curveSegments = SEG,
): THREE.BufferGeometry {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: false,
    curveSegments,
    steps: 1,
  });
  g.computeVertexNormals();
  return g;
}

export function box(w: number, h: number, d: number, x: number, y: number, z: number) {
  const g = new THREE.BoxGeometry(w, h, d);
  g.translate(x, y, z);
  return g;
}

export function cyl(
  r: number,
  h: number,
  x: number,
  y: number,
  z: number,
  axis: "x" | "y" | "z" = "z",
  segs = SEG,
) {
  const g = new THREE.CylinderGeometry(r, r, h, segs);
  if (axis === "z") g.rotateX(Math.PI / 2);
  if (axis === "x") g.rotateZ(Math.PI / 2);
  g.translate(x, y, z);
  return g;
}

export function tube(
  outerR: number,
  innerR: number,
  h: number,
  x: number,
  y: number,
  z: number,
  axis: "z" | "y" | "x" = "z",
) {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  s.holes.push(circleHole(0, 0, innerR * 2));
  const g = extrude(s, h, SEG);
  if (axis === "z") {
    // already +Z
  } else if (axis === "y") {
    g.rotateX(-Math.PI / 2);
  } else {
    g.rotateY(Math.PI / 2);
  }
  g.translate(x, y, z);
  return g;
}
