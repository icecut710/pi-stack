import * as THREE from "three";
import type { RackParams } from "./params";
import { circleHole, extrude, mergeGeos, roundedRectShape } from "./shapes";

/** Official Pi 4B reference geometry. Preview only — never exported as STL. */

export const PI_GREEN = "#2f6b3c";
export const PI_GOLD = "#d4a017";
export const PI_METAL = "#c5ccd3";
export const PI_BLACK = "#1a1d21";
export const PI_BLUE = "#1f4e8c";
export const PI_USB3 = "#4a7a3a";

function pcbGeom(p: RackParams): THREE.BufferGeometry {
  const s = roundedRectShape(p.piLength, p.piWidth, p.piCornerRadius);
  const holes: [number, number][] = [
    [p.piHoleInsetX, p.piHoleInsetY],
    [p.piHoleInsetX + p.piHoleSpacingX, p.piHoleInsetY],
    [p.piHoleInsetX, p.piHoleInsetY + p.piHoleSpacingY],
    [p.piHoleInsetX + p.piHoleSpacingX, p.piHoleInsetY + p.piHoleSpacingY],
  ];
  for (const [x, y] of holes) s.holes.push(circleHole(x, y, p.piHoleDia));
  return extrude(s, p.piThickness, 16);
}

function boxAt(
  w: number,
  d: number,
  h: number,
  x: number,
  y: number,
  z: number,
) {
  const g = new THREE.BoxGeometry(w, d, h);
  g.translate(x + w / 2, y + d / 2, z + h / 2);
  return g;
}

function cylAt(r: number, h: number, x: number, y: number, z: number, axis: "z" | "y" = "z") {
  const g = new THREE.CylinderGeometry(r, r, h, 18);
  if (axis === "z") g.rotateX(Math.PI / 2);
  g.translate(x, y, z + (axis === "z" ? h / 2 : 0));
  return g;
}

export interface PiMesh {
  name: string;
  color: string;
  geom: THREE.BufferGeometry;
  metal?: number;
  rough?: number;
}

export function buildPi4Meshes(p: RackParams): PiMesh[] {
  const t = p.piThickness;
  const meshes: PiMesh[] = [
    { name: "PCB", color: PI_GREEN, geom: pcbGeom(p), rough: 0.55, metal: 0.05 },
    {
      name: "USB-C",
      color: PI_METAL,
      geom: boxAt(9, 7.4, 3.2, 6.7, -1.25, t),
      metal: 0.7,
      rough: 0.35,
    },
    {
      name: "microHDMI 0",
      color: PI_METAL,
      geom: boxAt(7.1, 8.1, 3.5, 26.0, -1.7, t),
      metal: 0.7,
      rough: 0.35,
    },
    {
      name: "microHDMI 1",
      color: PI_METAL,
      geom: boxAt(7.1, 8.1, 3.5, 39.5, -1.7, t),
      metal: 0.7,
      rough: 0.35,
    },
    {
      name: "AV jack",
      color: PI_METAL,
      geom: cylAt(3.25, 6, 54.4, -0.4, t, "y"),
      metal: 0.65,
      rough: 0.3,
    },
    {
      name: "USB 3.0",
      color: PI_USB3,
      geom: boxAt(17.5, 14.5, 16, 85 + 3 - 17.5, 9 - 7.25, t - 0.4),
      metal: 0.15,
      rough: 0.45,
    },
    {
      name: "USB 2.0",
      color: PI_BLACK,
      geom: boxAt(17.5, 14.5, 16, 85 + 3 - 17.5, 27 - 7.25, t - 0.4),
      metal: 0.1,
      rough: 0.5,
    },
    {
      name: "Ethernet",
      color: PI_METAL,
      geom: boxAt(21.2, 16, 13.6, 85 + 3 - 21.2, 45.75 - 8, t - 0.4),
      metal: 0.45,
      rough: 0.4,
    },
    {
      name: "GPIO",
      color: PI_BLACK,
      geom: boxAt(51, 5.1, 8.5, 7.1, 50.0, t),
      metal: 0.05,
      rough: 0.6,
    },
    {
      name: "SoC",
      color: PI_BLACK,
      geom: boxAt(15, 15, 2.4, 21.75, 25, t),
      metal: 0.2,
      rough: 0.5,
    },
    {
      name: "RAM",
      color: PI_BLACK,
      geom: boxAt(10, 14, 1.1, 40.5, 25.5, t),
      metal: 0.15,
      rough: 0.5,
    },
    {
      name: "PoE header",
      color: PI_GOLD,
      geom: boxAt(5, 4.8, 8.5, 59.5, 48.6, t),
      metal: 0.6,
      rough: 0.35,
    },
    {
      name: "DSI",
      color: PI_GOLD,
      geom: boxAt(2.5, 22, 5.5, 2.75, 17, t),
      metal: 0.5,
      rough: 0.4,
    },
    {
      name: "CSI",
      color: PI_GOLD,
      geom: boxAt(22, 2.5, 5.5, 41.5, 11.5, t),
      metal: 0.5,
      rough: 0.4,
    },
    {
      name: "microSD",
      color: PI_METAL,
      geom: boxAt(14, 12, 1.8, -1.2, 22.15, -1.8),
      metal: 0.4,
      rough: 0.45,
    },
  ];
  return meshes;
}

export function buildHeatsink(p: RackParams): THREE.BufferGeometry {
  const t = p.piThickness;
  const s = p.heatsinkSize;
  const h = p.heatsinkHeight;
  const cx = 29.25;
  const cy = 32.5;
  const base = boxAt(s, s, 1.2, cx - s / 2, cy - s / 2, t + 2.4);
  const fins: THREE.BufferGeometry[] = [base];
  const n = 8;
  const fw = 0.7;
  const span = s - 2;
  const step = span / (n - 1);
  for (let i = 0; i < n; i++) {
    const x = cx - s / 2 + 1 + i * step;
    fins.push(boxAt(fw, s - 1.2, h - 1.2, x - fw / 2, cy - (s - 1.2) / 2, t + 2.4 + 1.2));
  }
  return mergeGeos(fins);
}

export const PI_KEEP_OUT = {
  usbOverhang: 3,
  ethOverhang: 3,
  hdmiOverhang: 1.7,
  usbcOverhang: 1.25,
  sdProtrude: 2.5,
  gpioHeight: 8.5,
  usbHeight: 16,
  ethHeight: 13.6,
  gpioY: [50, 55.1] as [number, number],
  sdY: [22.15, 34.15] as [number, number],
  usbcX: [6.7, 15.7] as [number, number],
  hdmi0X: [26, 33.1] as [number, number],
  hdmi1X: [39.5, 46.6] as [number, number],
};
