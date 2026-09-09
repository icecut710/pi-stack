import * as THREE from "three";
import { STLExporter } from "three/addons/exporters/STLExporter.js";
import JSZip from "jszip";
import { buildPrintable, PRINTABLE } from "./geometry";
import { buildOpenScad } from "./openscad";
import { buildBom } from "./bom";
import { validate, summary } from "./validate";
import type { PartId, RackParams } from "./params";
import { NODE_COLORS } from "./params";

const exporter = new STLExporter();

export function geometryToStl(geo: THREE.BufferGeometry, name: string): ArrayBuffer {
  const mesh = new THREE.Mesh(geo);
  mesh.name = name;
  const data = exporter.parse(mesh, { binary: true });
  if (data instanceof ArrayBuffer) return data;
  if (typeof data === "string") {
    const buf = new TextEncoder().encode(data);
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  }
  const view = data as DataView;
  return view.buffer.slice(view.byteOffset, view.byteOffset + view.byteLength) as ArrayBuffer;
}

export function stlBlob(geo: THREE.BufferGeometry, name: string): Blob {
  return new Blob([geometryToStl(geo, name)], { type: "model/stl" });
}

export function downloadableParts(p: RackParams): { id: PartId; filename: string; geo: THREE.BufferGeometry }[] {
  return PRINTABLE.map((part) => ({
    id: part.id,
    filename: `noderack-${part.id}.stl`,
    geo: buildPrintable(p, part.id),
  }));
}

export async function buildZip(p: RackParams): Promise<Blob> {
  const zip = new JSZip();
  const folder = zip.folder("noderack-pi4-cluster")!;
  folder.file("noderack.scad", buildOpenScad(p));
  folder.file("BOM.txt", bomText(p));
  folder.file("VALIDATION.txt", validationText(p));
  folder.file("README.txt", readmeText(p));

  const stls = folder.folder("stl")!;
  for (const part of PRINTABLE) {
    const geo = buildPrintable(p, part.id);
    const view = geometryToStl(geo, part.id);
    geo.dispose();
    stls.file(`noderack-${part.id}.stl`, view);
  }
  return zip.generateAsync({ type: "blob" });
}

export function bomText(p: RackParams): string {
  const rows = buildBom(p);
  const lines = [
    "NodeRack — Raspberry Pi 4 Model B 3-node rack",
    "Bill of materials (from current parameters)",
    "",
    "Qty  Item                              Spec",
    "---  --------------------------------  --------------------------------",
    ...rows.map(
      (r) =>
        `${String(r.qty).padStart(3, " ")}  ${r.item.padEnd(32, " ")}  ${r.spec}`,
    ),
    "",
    ...rows.map((r) => `  - ${r.item}: ${r.notes}`),
  ];
  return lines.join("\n");
}

export function validationText(p: RackParams): string {
  const checks = validate(p);
  const s = summary(checks);
  return [
    `NodeRack mechanical validation   pass ${s.pass}  warn ${s.warn}  fail ${s.fail}`,
    "",
    ...checks.map((c) => `[${c.severity.toUpperCase().padEnd(4, " ")}] ${c.group} / ${c.name}\n        ${c.detail}\n        spec: ${c.spec}`),
  ].join("\n\n");
}

export function readmeText(p: RackParams): string {
  return `NodeRack — parametric 3-node Raspberry Pi 4 Model B rack
Optimized for Anycubic Photon Mono 2 (resin)

Printable STLs are in /stl. Open noderack.scad in OpenSCAD to edit parameters
and re-export. The web studio generates the same geometry.

Print order (test-print strategy)
  1. Print tray-01 only. Mount one real Pi 4B on M2.5 brass standoffs.
  2. Verify four holes, Ethernet, USB-C, USB, micro-HDMI, GPIO, microSD, heatsink.
  3. Only then print the remaining trays, spacers, base, caps, and one fan bracket.

Orientation
  Trays, base, fan bracket: flat on the bed, features up. Almost no supports.
  Spacers and top caps: standing (hole vertical). No supports.

Do not include the Pi reference boards in a print — they are preview-only.

Node colours (optional tinted resin)
  NODE 01 ${NODE_COLORS[0]}  NODE 02 ${NODE_COLORS[1]}  NODE 03 ${NODE_COLORS[2]}
`;
}

export const PART_FILENAMES = PRINTABLE.map((p) => `noderack-${p.id}.stl`);
