import { FAN_SPECS, PHOTON_MONO_2, layout, type RackParams } from "./params";
import { buildPrintable, fanPlateSize, partBBox, PRINTABLE } from "./geometry";

export type Severity = "pass" | "warn" | "fail";

export interface Check {
  id: string;
  group: string;
  name: string;
  severity: Severity;
  detail: string;
  spec: string;
}

function sev(ok: boolean, warn: boolean): Severity {
  if (!ok) return "fail";
  if (warn) return "warn";
  return "pass";
}

export function validate(p: RackParams): Check[] {
  const L = layout(p);
  const checks: Check[] = [];

  const holeDx = p.piHoleSpacingX;
  const holeDy = p.piHoleSpacingY;
  checks.push({
    id: "pi-pattern",
    group: "Pi mounting",
    name: "Official 58 × 49 mm M2.5 pattern",
    severity: holeDx === 58 && holeDy === 49 && p.piHoleInsetX === 3.5 && p.piHoleInsetY === 3.5 ? "pass" : "warn",
    detail: `Holes at inset (${p.piHoleInsetX}, ${p.piHoleInsetY}) mm, spacing ${holeDx} × ${holeDy} mm. Four tray holes match.`,
    spec: "HAT mechanical + Pi 4B drawing",
  });

  checks.push({
    id: "m25-clearance",
    group: "Pi mounting",
    name: "M2.5 clearance through tray",
    severity: p.m25Clearance >= 2.8 && p.m25Clearance <= 3.1 ? "pass" : "warn",
    detail: `Ø ${p.m25Clearance.toFixed(2)} mm (PCB hole is Ø 2.7 mm). Sized for brass F-F standoffs, not printed posts.`,
    spec: "M2.5 clearance 2.8–3.0 mm",
  });

  const rodR = 1.5;
  const pcbCorner: [number, number] = [p.piOffsetX + p.piCornerRadius, p.piOffsetY + p.piCornerRadius];
  const rod = L.rodXY[0]!;
  const distCorner = Math.hypot(pcbCorner[0] - rod[0], pcbCorner[1] - rod[1]);
  const rodToPcb = distCorner - p.piCornerRadius - rodR;
  checks.push({
    id: "rod-pcb",
    group: "Pi safety",
    name: "M3 rods clear the PCB",
    severity: sev(rodToPcb > 1.0, rodToPcb < 2.0),
    detail: `Nearest rod-to-PCB clearance ${rodToPcb.toFixed(2)} mm (corner radius accounted).`,
    spec: "≥ 1.0 mm, prefer ≥ 2.0 mm",
  });

  const standoffR = 2.3;
  const bossR = p.bossDiameter / 2;
  const hole0 = L.piHoles[0]!;
  const bossToStandoff = Math.hypot(hole0[0] - rod[0], hole0[1] - rod[1]) - bossR - standoffR;
  checks.push({
    id: "boss-standoff",
    group: "Pi mounting",
    name: "Corner boss vs M2.5 standoff",
    severity: sev(bossToStandoff > 1.5, bossToStandoff < 2.5),
    detail: `XY gap ${bossToStandoff.toFixed(2)} mm. Pi flies ${p.standoffHeight.toFixed(1)} mm above the tray so bosses (${p.bossHeight.toFixed(1)} mm) cannot touch the PCB.`,
    spec: "≥ 1.5 mm XY, Z already clear",
  });

  const nextTrayBottom = L.spacerH;
  const heatsinkTop = p.standoffHeight + p.piThickness + p.heatsinkHeight;
  const hsClear = nextTrayBottom - heatsinkTop;
  checks.push({
    id: "heatsink",
    group: "Cooling",
    name: "Heatsink to tray above",
    severity: sev(hsClear > 2, hsClear < 5),
    detail: `${hsClear.toFixed(1)} mm above a ${p.heatsinkSize} × ${p.heatsinkHeight} mm sink. Board pitch ${p.boardPitch} mm.`,
    spec: "≥ 2 mm, prefer ≥ 5 mm",
  });

  const gpioTop = p.standoffHeight + p.piThickness + 8.5;
  const gpioClear = nextTrayBottom - gpioTop;
  checks.push({
    id: "gpio",
    group: "Service",
    name: "GPIO header access",
    severity: sev(gpioClear > 5, gpioClear < 8),
    detail: `${gpioClear.toFixed(1)} mm above the 40-pin header. Left (GPIO) side of the rack is fully open; Dupont housings route out the side.`,
    spec: "≥ 5 mm vertical, open left side",
  });

  const sdZ = p.standoffHeight - 1.8;
  checks.push({
    id: "sd",
    group: "Service",
    name: "microSD removal",
    severity: sev(sdZ > 3 && p.piOffsetX >= 8, p.piOffsetX < 10),
    detail: `Card sits ${sdZ.toFixed(1)} mm above the tray in a ${p.standoffHeight} mm standoff gap. Front lip ${p.piOffsetX} mm with an SD finger scoop. Card pulls toward the front of the rack.`,
    spec: "Unobstructed −X pull, ≥ 8 mm front lip",
  });

  checks.push({
    id: "usbc",
    group: "Cables",
    name: "USB-C plug + bend room",
    severity: sev(p.fanStandoff >= 24, p.fanStandoff < 30),
    detail: `Fan plate stands ${p.fanStandoff} mm off the HDMI edge. USB-C overhangs ~1.3 mm; a straight plug is ~18 mm. Remaining ~${(p.fanStandoff - 20).toFixed(0)} mm to bend the cable out the front or rear of the gap.`,
    spec: "≥ 24 mm standoff, prefer 30–34 mm",
  });

  checks.push({
    id: "hdmi",
    group: "Cables",
    name: "micro-HDMI access",
    severity: sev(p.fanStandoff >= 26, p.fanStandoff < 32),
    detail: `Two micro-HDMI ports on the HDMI edge. ${p.fanStandoff} mm gap. Chunky official cables may want a slim or right-angle adapter; slim cables fit.`,
    spec: "≥ 26 mm, 32 mm designed",
  });

  const rear = L.rearMargin;
  checks.push({
    id: "eth-usb",
    group: "Cables",
    name: "Ethernet / USB plug room",
    severity: sev(rear >= 6, rear < 8),
    detail: `Jacks overhang the PCB by 3 mm. Tray rear margin ${rear.toFixed(1)} mm, no rear wall. Plugs have free air; three Velcro/tie slots sit in the rear lip.`,
    spec: "Open rear, ≥ 6 mm tray margin",
  });

  const fanInner = p.fanStandoff;
  checks.push({
    id: "fan-pi",
    group: "Cooling",
    name: "Fan hardware vs Pi",
    severity: sev(fanInner > 12, fanInner < 22),
    detail: `Four thick posts, no skinny cantilevers. Inner plate face is ${fanInner} mm from the tray HDMI edge, so it cannot hit USB-C, HDMI, or the 3.5 mm jack.`,
    spec: "No contact, ≥ 12 mm",
  });

  const bossWall = (p.bossDiameter - p.m3Clearance) / 2;
  checks.push({
    id: "wall-boss",
    group: "Resin",
    name: "Wall around M3 hole",
    severity: sev(bossWall >= 2.5, bossWall < 3),
    detail: `${bossWall.toFixed(2)} mm of material around each M3 rod hole (boss Ø ${p.bossDiameter} mm).`,
    spec: "≥ 2.5 mm, prefer 3 mm",
  });

  const spacerWall = (p.spacerOd - p.m3Clearance) / 2;
  checks.push({
    id: "wall-spacer",
    group: "Resin",
    name: "Spacer tube wall",
    severity: sev(spacerWall >= 2.5, spacerWall < 3),
    detail: `${spacerWall.toFixed(2)} mm wall, open ID so resin drains.`,
    spec: "≥ 2.5 mm",
  });

  checks.push({
    id: "tray-th",
    group: "Resin",
    name: "Tray structural thickness",
    severity: sev(p.trayThickness >= 2.5, p.trayThickness < 3),
    detail: `${p.trayThickness.toFixed(1)} mm plate, through-slots for drainage, no suction-cup cavities.`,
    spec: "≥ 2.5 mm, target 3 mm",
  });

  checks.push({
    id: "pitch",
    group: "Cooling",
    name: "Vertical clearance between boards",
    severity: sev(p.boardPitch >= 28 && p.boardPitch <= 36, p.boardPitch < 30 || p.boardPitch > 32),
    detail: `Tray-to-tray pitch ${p.boardPitch} mm (PCB-to-PCB same). Spacer ${L.spacerH.toFixed(1)} mm.`,
    spec: "28–32 mm target",
  });

  // Print volume for every printable
  for (const part of PRINTABLE) {
    try {
      const geo = buildPrintable(p, part.id);
      const b = partBBox(geo);
      geo.dispose();
      const dims = [b.w, b.d, b.h].sort((a, c) => c - a);
      const fitComfort =
        (dims[0]! <= PHOTON_MONO_2.comfortableX &&
          dims[1]! <= PHOTON_MONO_2.comfortableY &&
          dims[2]! <= PHOTON_MONO_2.comfortableZ) ||
        (dims[0]! <= PHOTON_MONO_2.comfortableX &&
          dims[2]! <= PHOTON_MONO_2.comfortableY &&
          dims[1]! <= PHOTON_MONO_2.comfortableZ);
      const fitAbs =
        dims[0]! <= PHOTON_MONO_2.x && dims[1]! <= PHOTON_MONO_2.y && dims[2]! <= PHOTON_MONO_2.z;
      checks.push({
        id: `print-${part.id}`,
        group: "Photon Mono 2",
        name: `${part.name} build volume`,
        severity: sev(fitAbs, !fitComfort),
        detail: `BBox ${b.w.toFixed(1)} × ${b.d.toFixed(1)} × ${b.h.toFixed(1)} mm. Comfortable envelope ${PHOTON_MONO_2.comfortableX} × ${PHOTON_MONO_2.comfortableY} × ${PHOTON_MONO_2.comfortableZ} mm.`,
        spec: `${PHOTON_MONO_2.name} 143 × 89 × 165 mm`,
      });
    } catch (err) {
      checks.push({
        id: `print-${part.id}`,
        group: "Photon Mono 2",
        name: `${part.name} build volume`,
        severity: "fail",
        detail: `Could not tessellate: ${err instanceof Error ? err.message : String(err)}`,
        spec: "Part must tessellate",
      });
    }
  }

  const fan = fanPlateSize(p, p.fanSize);
  checks.push({
    id: "fan-plate-y",
    group: "Photon Mono 2",
    name: "Active fan bracket on the bed",
    severity: sev(fan.plateH <= PHOTON_MONO_2.y, fan.plateH > PHOTON_MONO_2.comfortableY),
    detail: `${p.fanSize} mm bracket plate ${fan.plateW.toFixed(1)} × ${fan.plateH.toFixed(1)} mm. Print flat, posts up. Align the long side to X (143 mm).`,
    spec: "Y ≤ 85 mm comfortable, 89 mm absolute",
  });

  checks.push({
    id: "service-unstack",
    group: "Service",
    name: "Single-node service",
    severity: "pass",
    detail:
      "Four knurled top caps unscrew by hand. Lift NODE 03 (and spacers) straight off the rods to reach NODE 02. Cables have service loops at the rear. microSD, USB-C, HDMI and GPIO on a live node do not require unstacking.",
    spec: "No snap fits; screw-together only",
  });

  checks.push({
    id: "no-snap",
    group: "Structure",
    name: "No snap-fits / living hinges",
    severity: "pass",
    detail: "M3 rods + nuts + printed spacers. M2.5 brass standoffs for the Pis. Fan uses 4 captured M3 nuts. Nothing relies on resin flex.",
    spec: "Screw-together, serviceable",
  });

  return checks;
}

export function summary(checks: Check[]) {
  return {
    pass: checks.filter((c) => c.severity === "pass").length,
    warn: checks.filter((c) => c.severity === "warn").length,
    fail: checks.filter((c) => c.severity === "fail").length,
    total: checks.length,
  };
}
