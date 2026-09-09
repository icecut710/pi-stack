/** Official Raspberry Pi 4 Model B mechanicals + rack parameters.
 *  Board size, hole pattern and connector locations follow the Raspberry Pi
 *  4B mechanical drawing / HAT spec (85 × 56 mm, 58 × 49 mm M2.5 pattern).
 */

export type FanSize = 30 | 60 | 80;
export type ViewMode = "assembled" | "exploded" | "part";
export type PartId =
  | "tray-01"
  | "tray-02"
  | "tray-03"
  | "spacer"
  | "lower-spacer"
  | "base"
  | "top-cap"
  | "fan-30"
  | "fan-60"
  | "fan-80";

export interface RackParams {
  piLength: number;
  piWidth: number;
  piThickness: number;
  piCornerRadius: number;
  piHoleDia: number;
  piHoleInsetX: number;
  piHoleInsetY: number;
  piHoleSpacingX: number;
  piHoleSpacingY: number;

  trayLength: number;
  trayWidth: number;
  trayThickness: number;
  trayCornerRadius: number;
  piOffsetX: number;
  piOffsetY: number;

  m25Clearance: number;
  m3Clearance: number;
  m3NutAf: number;
  m3NutThickness: number;
  printTolerance: number;
  labelDepth: number;
  labelHeight: number;

  bossDiameter: number;
  bossHeight: number;
  bossInset: number;

  standoffHeight: number;
  boardPitch: number;
  nodeCount: number;
  lowerSpacerH: number;
  baseThickness: number;
  spacerOd: number;
  topCapHeight: number;
  topCapOd: number;

  footDiameter: number;
  footRecess: number;
  footProtrude: number;

  fanSize: FanSize;
  fanStandoff: number;
  fanPlateThickness: number;
  heatsinkSize: number;
  heatsinkHeight: number;

  slotWidth: number;
  slotCount: number;
  slotEndRadius: number;

  tieSlotLength: number;
  tieSlotWidth: number;

  earWidth: number;
  earProtrude: number;
  earThickness: number;
}

export const FAN_SPECS: Record<
  FanSize,
  {
    size: number;
    holeSpacing: number;
    holeDia: number;
    thickness: number;
    cutout: number;
    screw: string;
  }
> = {
  30: { size: 30, holeSpacing: 24, holeDia: 3.2, thickness: 7, cutout: 27, screw: "M3" },
  60: { size: 60, holeSpacing: 50, holeDia: 4.4, thickness: 15, cutout: 56, screw: "M4" },
  80: { size: 80, holeSpacing: 71.5, holeDia: 4.4, thickness: 25, cutout: 76, screw: "M4" },
};

export const DEFAULT_PARAMS: RackParams = {
  piLength: 85,
  piWidth: 56,
  piThickness: 1.5,
  piCornerRadius: 3,
  piHoleDia: 2.7,
  piHoleInsetX: 3.5,
  piHoleInsetY: 3.5,
  piHoleSpacingX: 58,
  piHoleSpacingY: 49,

  trayLength: 106,
  trayWidth: 74,
  trayThickness: 3,
  trayCornerRadius: 6,
  piOffsetX: 11,
  piOffsetY: 9,

  m25Clearance: 2.9,
  m3Clearance: 3.4,
  m3NutAf: 5.5,
  m3NutThickness: 2.4,
  printTolerance: 0.2,
  labelDepth: 0.6,
  labelHeight: 5.4,

  bossDiameter: 11,
  bossHeight: 1.6,
  bossInset: 6.5,

  standoffHeight: 8,
  boardPitch: 31,
  nodeCount: 3,
  lowerSpacerH: 10,
  baseThickness: 4,
  spacerOd: 9.6,
  topCapHeight: 7,
  topCapOd: 16,

  footDiameter: 8.5,
  footRecess: 1.2,
  footProtrude: 3,

  fanSize: 80,
  fanStandoff: 32,
  fanPlateThickness: 4,
  heatsinkSize: 22,
  heatsinkHeight: 10,

  slotWidth: 6.6,
  slotCount: 5,
  slotEndRadius: 3.3,

  tieSlotLength: 14,
  tieSlotWidth: 3.4,

  earWidth: 12,
  earProtrude: 9,
  earThickness: 4.6,
};

export const NODE_LABELS = ["NODE 01", "NODE 02", "NODE 03"] as const;
export const NODE_COLORS = ["#2b6cb0", "#2f9e62", "#c44536"] as const;

export interface Layout {
  spacerH: number;
  rearMargin: number;
  gpioMargin: number;
  zBaseBottom: number;
  zBaseTop: number;
  zTray: number[];
  zPiPcb: number[];
  zTop: number;
  zRodTop: number;
  rodLength: number;
  overallHeight: number;
  overallWidth: number;
  overallDepth: number;
  rodXY: [number, number][];
  piHoles: [number, number][];
  earX: [number, number];
  fanMountZ: [number, number];
  assemblyCenter: [number, number, number];
}

export function layout(p: RackParams): Layout {
  const spacerH = p.boardPitch - p.trayThickness;
  const rearMargin = p.trayLength - p.piLength - p.piOffsetX;
  const gpioMargin = p.trayWidth - p.piWidth - p.piOffsetY;
  const zBaseBottom = p.footProtrude;
  const zBaseTop = zBaseBottom + p.baseThickness;
  const zN1 = zBaseTop + p.lowerSpacerH;
  const zTray = [0, 1, 2].map((i) => zN1 + i * p.boardPitch);
  const zPiPcb = zTray.map((z) => z + p.trayThickness + p.standoffHeight);
  const zTop = zTray[2]! + p.trayThickness + p.bossHeight;
  const zRodTop = zTray[2]! + p.trayThickness + p.topCapHeight + 1;
  const rodLength = Math.ceil(zRodTop - (zBaseBottom - p.m3NutThickness) + 4);
  const overallHeight = zRodTop + 2;
  const overallWidth = p.trayWidth + p.fanStandoff + p.fanPlateThickness + FAN_SPECS[p.fanSize].thickness;
  const overallDepth = p.trayLength;

  const rodXY: [number, number][] = [
    [p.bossInset, p.bossInset],
    [p.trayLength - p.bossInset, p.bossInset],
    [p.bossInset, p.trayWidth - p.bossInset],
    [p.trayLength - p.bossInset, p.trayWidth - p.bossInset],
  ];

  const piHoles: [number, number][] = [
    [p.piOffsetX + p.piHoleInsetX, p.piOffsetY + p.piHoleInsetY],
    [p.piOffsetX + p.piHoleInsetX + p.piHoleSpacingX, p.piOffsetY + p.piHoleInsetY],
    [p.piOffsetX + p.piHoleInsetX, p.piOffsetY + p.piHoleInsetY + p.piHoleSpacingY],
    [p.piOffsetX + p.piHoleInsetX + p.piHoleSpacingX, p.piOffsetY + p.piHoleInsetY + p.piHoleSpacingY],
  ];

  const earX: [number, number] = [14, p.trayLength - 14];
  const fanMountZ: [number, number] = [
    zTray[0]! + p.trayThickness / 2,
    zTray[2]! + p.trayThickness / 2,
  ];

  const assemblyCenter: [number, number, number] = [
    p.trayLength / 2,
    p.trayWidth / 2 - 8,
    overallHeight / 2,
  ];

  return {
    spacerH,
    rearMargin,
    gpioMargin,
    zBaseBottom,
    zBaseTop,
    zTray,
    zPiPcb,
    zTop,
    zRodTop,
    rodLength,
    overallHeight,
    overallWidth,
    overallDepth,
    rodXY,
    piHoles,
    earX,
    fanMountZ,
    assemblyCenter,
  };
}

export const PARAM_META: {
  key: keyof RackParams;
  label: string;
  group: string;
  min: number;
  max: number;
  step: number;
  unit: string;
}[] = [
  { key: "piLength", label: "Pi length", group: "Pi board", min: 80, max: 90, step: 0.1, unit: "mm" },
  { key: "piWidth", label: "Pi width", group: "Pi board", min: 50, max: 62, step: 0.1, unit: "mm" },
  { key: "piThickness", label: "PCB thickness", group: "Pi board", min: 1.2, max: 2, step: 0.1, unit: "mm" },
  { key: "piHoleInsetX", label: "Hole inset X (SD)", group: "Pi board", min: 3, max: 5, step: 0.1, unit: "mm" },
  { key: "piHoleInsetY", label: "Hole inset Y (HDMI)", group: "Pi board", min: 3, max: 5, step: 0.1, unit: "mm" },
  { key: "piHoleSpacingX", label: "Hole spacing X", group: "Pi board", min: 56, max: 60, step: 0.1, unit: "mm" },
  { key: "piHoleSpacingY", label: "Hole spacing Y", group: "Pi board", min: 47, max: 51, step: 0.1, unit: "mm" },
  { key: "trayLength", label: "Tray length", group: "Tray", min: 95, max: 120, step: 0.5, unit: "mm" },
  { key: "trayWidth", label: "Tray width", group: "Tray", min: 65, max: 85, step: 0.5, unit: "mm" },
  { key: "trayThickness", label: "Tray thickness", group: "Tray", min: 2.5, max: 4.5, step: 0.1, unit: "mm" },
  { key: "trayCornerRadius", label: "Corner radius", group: "Tray", min: 3, max: 10, step: 0.5, unit: "mm" },
  { key: "piOffsetX", label: "Pi offset X (SD lip)", group: "Tray", min: 8, max: 16, step: 0.5, unit: "mm" },
  { key: "piOffsetY", label: "Pi offset Y (HDMI lip)", group: "Tray", min: 6, max: 14, step: 0.5, unit: "mm" },
  { key: "m25Clearance", label: "M2.5 clearance", group: "Hardware", min: 2.7, max: 3.2, step: 0.05, unit: "mm" },
  { key: "m3Clearance", label: "M3 clearance", group: "Hardware", min: 3.1, max: 3.7, step: 0.05, unit: "mm" },
  { key: "printTolerance", label: "Print tolerance", group: "Hardware", min: 0, max: 0.4, step: 0.05, unit: "mm" },
  { key: "labelDepth", label: "Label height", group: "Hardware", min: 0.4, max: 1, step: 0.1, unit: "mm" },
  { key: "bossDiameter", label: "Boss diameter", group: "Rack", min: 9, max: 14, step: 0.5, unit: "mm" },
  { key: "bossInset", label: "Boss inset", group: "Rack", min: 5, max: 9, step: 0.5, unit: "mm" },
  { key: "standoffHeight", label: "M2.5 standoff", group: "Rack", min: 6, max: 12, step: 0.5, unit: "mm" },
  { key: "boardPitch", label: "Board pitch", group: "Rack", min: 26, max: 40, step: 0.5, unit: "mm" },
  { key: "lowerSpacerH", label: "Lower spacer", group: "Rack", min: 6, max: 16, step: 0.5, unit: "mm" },
  { key: "spacerOd", label: "Spacer OD", group: "Rack", min: 8, max: 12, step: 0.2, unit: "mm" },
  { key: "fanStandoff", label: "Fan standoff", group: "Cooling", min: 22, max: 42, step: 1, unit: "mm" },
  { key: "heatsinkSize", label: "Heatsink size", group: "Cooling", min: 14, max: 30, step: 1, unit: "mm" },
  { key: "heatsinkHeight", label: "Heatsink height", group: "Cooling", min: 6, max: 16, step: 0.5, unit: "mm" },
  { key: "slotWidth", label: "Airflow slot width", group: "Cooling", min: 4, max: 9, step: 0.2, unit: "mm" },
  { key: "slotCount", label: "Airflow slot count", group: "Cooling", min: 3, max: 7, step: 1, unit: "" },
];

export const PHOTON_MONO_2 = {
  name: "Anycubic Photon Mono 2",
  x: 143,
  y: 89,
  z: 165,
  comfortableX: 140,
  comfortableY: 85,
  comfortableZ: 160,
};
