import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as ExtrudeGeometry, f as Mesh, g as Vector3, h as Shape, l as BufferGeometry, m as Path, s as BoxGeometry, u as CylinderGeometry } from "../_libs/@react-three/drei+[...].mjs";
import { a as Fan, c as Download, d as CircleX, f as Check, i as Grid3x3, l as Cpu, n as RotateCcw, o as Eye, p as Box, r as Layers, s as EyeOff, t as TriangleAlert, u as Copy } from "../_libs/lucide-react.mjs";
import { r as Slot } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as Viewport, n as Scrollbar, r as Thumb, t as Root } from "../_libs/@radix-ui/react-scroll-area+[...].mjs";
import { n as mergeGeometries, t as STLExporter } from "../_libs/three.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as require_lib } from "../_libs/jszip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-B7zOzMOm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.rel = "noopener";
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function mm(n, digits = 1) {
	return `${n.toFixed(digits)} mm`;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
			ghost: "hover:bg-muted text-foreground",
			outline: "border border-border bg-transparent hover:bg-muted",
			danger: "bg-danger text-white hover:opacity-90"
		},
		size: {
			default: "h-10 px-3.5",
			sm: "h-8 px-2.5 text-xs",
			lg: "h-11 px-4",
			icon: "h-10 w-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
		className: "h-full w-full rounded-[inherit]",
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar, {
		orientation: "vertical",
		className: "flex w-2 touch-none select-none p-px",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { className: "relative flex-1 rounded-full bg-border" })
	})]
}));
ScrollArea.displayName = "ScrollArea";
var FAN_SPECS = {
	30: {
		size: 30,
		holeSpacing: 24,
		holeDia: 3.2,
		thickness: 7,
		cutout: 27,
		screw: "M3"
	},
	60: {
		size: 60,
		holeSpacing: 50,
		holeDia: 4.4,
		thickness: 15,
		cutout: 56,
		screw: "M4"
	},
	80: {
		size: 80,
		holeSpacing: 71.5,
		holeDia: 4.4,
		thickness: 25,
		cutout: 76,
		screw: "M4"
	}
};
var DEFAULT_PARAMS = {
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
	printTolerance: .2,
	labelDepth: .6,
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
	earThickness: 4.6
};
var NODE_LABELS = [
	"NODE 01",
	"NODE 02",
	"NODE 03"
];
var NODE_COLORS = [
	"#2b6cb0",
	"#2f9e62",
	"#c44536"
];
function layout(p) {
	const spacerH = p.boardPitch - p.trayThickness;
	const rearMargin = p.trayLength - p.piLength - p.piOffsetX;
	const gpioMargin = p.trayWidth - p.piWidth - p.piOffsetY;
	const zBaseBottom = p.footProtrude;
	const zBaseTop = zBaseBottom + p.baseThickness;
	const zN1 = zBaseTop + p.lowerSpacerH;
	const zTray = [
		0,
		1,
		2
	].map((i) => zN1 + i * p.boardPitch);
	const zPiPcb = zTray.map((z) => z + p.trayThickness + p.standoffHeight);
	const zTop = zTray[2] + p.trayThickness + p.bossHeight;
	const zRodTop = zTray[2] + p.trayThickness + p.topCapHeight + 1;
	const rodLength = Math.ceil(zRodTop - (zBaseBottom - p.m3NutThickness) + 4);
	const overallHeight = zRodTop + 2;
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
		overallWidth: p.trayWidth + p.fanStandoff + p.fanPlateThickness + FAN_SPECS[p.fanSize].thickness,
		overallDepth: p.trayLength,
		rodXY: [
			[p.bossInset, p.bossInset],
			[p.trayLength - p.bossInset, p.bossInset],
			[p.bossInset, p.trayWidth - p.bossInset],
			[p.trayLength - p.bossInset, p.trayWidth - p.bossInset]
		],
		piHoles: [
			[p.piOffsetX + p.piHoleInsetX, p.piOffsetY + p.piHoleInsetY],
			[p.piOffsetX + p.piHoleInsetX + p.piHoleSpacingX, p.piOffsetY + p.piHoleInsetY],
			[p.piOffsetX + p.piHoleInsetX, p.piOffsetY + p.piHoleInsetY + p.piHoleSpacingY],
			[p.piOffsetX + p.piHoleInsetX + p.piHoleSpacingX, p.piOffsetY + p.piHoleInsetY + p.piHoleSpacingY]
		],
		earX: [14, p.trayLength - 14],
		fanMountZ: [zTray[0] + p.trayThickness / 2, zTray[2] + p.trayThickness / 2],
		assemblyCenter: [
			p.trayLength / 2,
			p.trayWidth / 2 - 8,
			overallHeight / 2
		]
	};
}
var PARAM_META = [
	{
		key: "piLength",
		label: "Pi length",
		group: "Pi board",
		min: 80,
		max: 90,
		step: .1,
		unit: "mm"
	},
	{
		key: "piWidth",
		label: "Pi width",
		group: "Pi board",
		min: 50,
		max: 62,
		step: .1,
		unit: "mm"
	},
	{
		key: "piThickness",
		label: "PCB thickness",
		group: "Pi board",
		min: 1.2,
		max: 2,
		step: .1,
		unit: "mm"
	},
	{
		key: "piHoleInsetX",
		label: "Hole inset X (SD)",
		group: "Pi board",
		min: 3,
		max: 5,
		step: .1,
		unit: "mm"
	},
	{
		key: "piHoleInsetY",
		label: "Hole inset Y (HDMI)",
		group: "Pi board",
		min: 3,
		max: 5,
		step: .1,
		unit: "mm"
	},
	{
		key: "piHoleSpacingX",
		label: "Hole spacing X",
		group: "Pi board",
		min: 56,
		max: 60,
		step: .1,
		unit: "mm"
	},
	{
		key: "piHoleSpacingY",
		label: "Hole spacing Y",
		group: "Pi board",
		min: 47,
		max: 51,
		step: .1,
		unit: "mm"
	},
	{
		key: "trayLength",
		label: "Tray length",
		group: "Tray",
		min: 95,
		max: 120,
		step: .5,
		unit: "mm"
	},
	{
		key: "trayWidth",
		label: "Tray width",
		group: "Tray",
		min: 65,
		max: 85,
		step: .5,
		unit: "mm"
	},
	{
		key: "trayThickness",
		label: "Tray thickness",
		group: "Tray",
		min: 2.5,
		max: 4.5,
		step: .1,
		unit: "mm"
	},
	{
		key: "trayCornerRadius",
		label: "Corner radius",
		group: "Tray",
		min: 3,
		max: 10,
		step: .5,
		unit: "mm"
	},
	{
		key: "piOffsetX",
		label: "Pi offset X (SD lip)",
		group: "Tray",
		min: 8,
		max: 16,
		step: .5,
		unit: "mm"
	},
	{
		key: "piOffsetY",
		label: "Pi offset Y (HDMI lip)",
		group: "Tray",
		min: 6,
		max: 14,
		step: .5,
		unit: "mm"
	},
	{
		key: "m25Clearance",
		label: "M2.5 clearance",
		group: "Hardware",
		min: 2.7,
		max: 3.2,
		step: .05,
		unit: "mm"
	},
	{
		key: "m3Clearance",
		label: "M3 clearance",
		group: "Hardware",
		min: 3.1,
		max: 3.7,
		step: .05,
		unit: "mm"
	},
	{
		key: "printTolerance",
		label: "Print tolerance",
		group: "Hardware",
		min: 0,
		max: .4,
		step: .05,
		unit: "mm"
	},
	{
		key: "labelDepth",
		label: "Label height",
		group: "Hardware",
		min: .4,
		max: 1,
		step: .1,
		unit: "mm"
	},
	{
		key: "bossDiameter",
		label: "Boss diameter",
		group: "Rack",
		min: 9,
		max: 14,
		step: .5,
		unit: "mm"
	},
	{
		key: "bossInset",
		label: "Boss inset",
		group: "Rack",
		min: 5,
		max: 9,
		step: .5,
		unit: "mm"
	},
	{
		key: "standoffHeight",
		label: "M2.5 standoff",
		group: "Rack",
		min: 6,
		max: 12,
		step: .5,
		unit: "mm"
	},
	{
		key: "boardPitch",
		label: "Board pitch",
		group: "Rack",
		min: 26,
		max: 40,
		step: .5,
		unit: "mm"
	},
	{
		key: "lowerSpacerH",
		label: "Lower spacer",
		group: "Rack",
		min: 6,
		max: 16,
		step: .5,
		unit: "mm"
	},
	{
		key: "spacerOd",
		label: "Spacer OD",
		group: "Rack",
		min: 8,
		max: 12,
		step: .2,
		unit: "mm"
	},
	{
		key: "fanStandoff",
		label: "Fan standoff",
		group: "Cooling",
		min: 22,
		max: 42,
		step: 1,
		unit: "mm"
	},
	{
		key: "heatsinkSize",
		label: "Heatsink size",
		group: "Cooling",
		min: 14,
		max: 30,
		step: 1,
		unit: "mm"
	},
	{
		key: "heatsinkHeight",
		label: "Heatsink height",
		group: "Cooling",
		min: 6,
		max: 16,
		step: .5,
		unit: "mm"
	},
	{
		key: "slotWidth",
		label: "Airflow slot width",
		group: "Cooling",
		min: 4,
		max: 9,
		step: .2,
		unit: "mm"
	},
	{
		key: "slotCount",
		label: "Airflow slot count",
		group: "Cooling",
		min: 3,
		max: 7,
		step: 1,
		unit: ""
	}
];
var PHOTON_MONO_2 = {
	name: "Anycubic Photon Mono 2",
	x: 143,
	y: 89,
	z: 165,
	comfortableX: 140,
	comfortableY: 85,
	comfortableZ: 160
};
function buildBom(p, fan = p.fanSize) {
	const L = layout(p);
	const spec = FAN_SPECS[fan];
	const rod = L.rodLength;
	const spacerH = L.spacerH;
	return [
		{
			item: "Node tray 01",
			spec: `Printed, ${p.trayLength} × ${p.trayWidth} × ${p.trayThickness} mm`,
			qty: 1,
			group: "print",
			notes: "Ears, NODE 01"
		},
		{
			item: "Node tray 02",
			spec: `Printed, same plate`,
			qty: 1,
			group: "print",
			notes: "No ears, NODE 02"
		},
		{
			item: "Node tray 03",
			spec: `Printed, same plate`,
			qty: 1,
			group: "print",
			notes: "Ears, NODE 03"
		},
		{
			item: "Inter-tray spacer",
			spec: `Printed tube Ø ${p.spacerOd} × ${spacerH.toFixed(1)} mm`,
			qty: 8,
			group: "print",
			notes: "4 per gap × 2 gaps"
		},
		{
			item: "Lower spacer",
			spec: `Printed tube Ø ${p.spacerOd} × ${p.lowerSpacerH} mm`,
			qty: 4,
			group: "print",
			notes: "Base to NODE 01"
		},
		{
			item: "Base / expansion plate",
			spec: `Printed, ${p.trayLength} × ${p.trayWidth} × ${p.baseThickness} mm`,
			qty: 1,
			group: "print",
			notes: "4× M3 expansion, foot wells"
		},
		{
			item: "Knurled top cap",
			spec: `Printed Ø ${p.topCapOd} × ${p.topCapHeight} mm`,
			qty: 4,
			group: "print",
			notes: "Press-in M3 nut"
		},
		{
			item: `${fan} mm fan bracket`,
			spec: `Printed, 4-point, ${p.fanStandoff} mm standoff`,
			qty: 1,
			group: "print",
			notes: "Print only the size you will run"
		},
		{
			item: "M3 threaded rod",
			spec: `Cut to ${rod} mm (buy 100 mm, trim)`,
			qty: 4,
			group: "fastener",
			notes: "Stainless or zinc, DIN 975"
		},
		{
			item: "M3 hex nut",
			spec: "DIN 934, 5.5 mm AF",
			qty: 16,
			group: "fastener",
			notes: "4 base, 4 top caps, 4 fan, 4 spare/lock"
		},
		{
			item: "M3 washer",
			spec: "DIN 125",
			qty: 8,
			group: "fastener",
			notes: "Under base nuts + under top caps"
		},
		{
			item: "M3 × 16 mm pan head",
			spec: "Phillips or hex",
			qty: 4,
			group: "fastener",
			notes: "Fan bracket to tray ears"
		},
		{
			item: "M2.5 F-F brass standoff",
			spec: `${p.standoffHeight} mm female-female`,
			qty: 12,
			group: "fastener",
			notes: "4 per Pi, between tray and PCB"
		},
		{
			item: "M2.5 × 6 mm screw",
			spec: "Pan head, Phillips",
			qty: 12,
			group: "fastener",
			notes: "Tray underside into standoff"
		},
		{
			item: "M2.5 × 5 mm screw",
			spec: "Pan head, Phillips",
			qty: 12,
			group: "fastener",
			notes: "Through Pi into standoff"
		},
		{
			item: `${fan} mm fan`,
			spec: `${spec.size} × ${spec.size} × ${spec.thickness} mm, ${spec.screw} holes @ ${spec.holeSpacing} mm`,
			qty: 1,
			group: "bought",
			notes: fan === 30 ? "CanaKit stopgap" : "Prefer 5 V quiet fan, 80 mm long-term"
		},
		{
			item: `${spec.screw} fan screws`,
			spec: `${spec.screw} × 20 mm (80/60) or M3 × 12 (30)`,
			qty: 4,
			group: "fastener",
			notes: "Fan to bracket"
		},
		{
			item: "Rubber feet",
			spec: `Ø ${p.footDiameter} mm, 3 mm, adhesive`,
			qty: 4,
			group: "bought",
			notes: "Seat in base recesses"
		},
		{
			item: "Raspberry Pi 4 Model B",
			spec: "Bare board, no case",
			qty: 3,
			group: "bought",
			notes: "Heatsinks fitted"
		},
		{
			item: "Low-profile heatsink",
			spec: `≤ ${p.heatsinkSize} × ${p.heatsinkHeight} mm on SoC`,
			qty: 3,
			group: "bought",
			notes: "Check height vs board pitch"
		},
		{
			item: "USB-C 5 V 3 A PSU",
			spec: "Official or equivalent",
			qty: 3,
			group: "bought",
			notes: "Or a 3-way USB-C PD hub in the expansion bay"
		},
		{
			item: "Gigabit Ethernet",
			spec: "Cat5e/Cat6 patch, 0.3–1 m",
			qty: 3,
			group: "bought",
			notes: "Service loop at rear"
		},
		{
			item: "Velcro cable ties",
			spec: "10 mm reusable",
			qty: 12,
			group: "bought",
			notes: "Rear tray slots"
		}
	];
}
function rodCutList(p) {
	const L = layout(p);
	return {
		buy: "M3 × 100 mm threaded rod × 4",
		cutTo: `${L.rodLength} mm`,
		stack: `${p.footProtrude} (feet) + ${p.baseThickness} (base) + ${p.lowerSpacerH} (lower) + 3×${p.trayThickness} (trays) + 2×${L.spacerH.toFixed(1)} (spacers) + ${p.topCapHeight} (cap) ≈ ${L.rodLength} mm including nut engagement`
	};
}
var ASSEMBLE_STEPS = [
	{
		title: "Prepare hardware",
		body: "Lay out 4× M3 rods (cut to length), 16× M3 nuts, 8× M3 washers, 12× M2.5 brass F-F standoffs, 24× M2.5 screws, 4 rubber feet, and the printed parts. Press an M3 nut into each knurled top cap and into each fan-ear hex pocket."
	},
	{
		title: "Base plate",
		body: "Stick the four rubber feet into the corner wells. Drop four M3 nuts into the underside hex counterbores (or thread them onto the rods first). Slide the four rods up through the base. Fit a washer under each nut. Stand the rack on the feet."
	},
	{
		title: "Lower spacers",
		body: "Drop one lower spacer onto each rod so it seats on the base register collar. These set the expansion-bay gap and raise NODE 01 into the fan window."
	},
	{
		title: "NODE 01 tray",
		body: "Slide the blue NODE 01 tray down the rods, fan ears toward the HDMI / USB-C side (the side with the power and video connectors). Bosses face up."
	},
	{
		title: "Mount the first Pi (test this before printing the rest)",
		body: "From under the tray, run M2.5 × 6 mm screws into four brass standoffs. Set the Pi 4B on the standoffs, SD card toward the front scoop, Ethernet / USB toward the rear tie slots. Fasten with four M2.5 × 5 mm screws. Confirm all four holes, then plug Ethernet, USB-C, a micro-HDMI, and pull the microSD."
	},
	{
		title: "Inter-tray spacers and NODE 02 / 03",
		body: "Four spacers on the rods, green NODE 02, four more spacers, red NODE 03. Same Pi orientation on every level. Fit heatsinks before the tray above goes on."
	},
	{
		title: "Top caps",
		body: "Washer then knurled cap on each rod. Tighten finger-tight — the caps are the service fasteners. Do not crush the printed bosses."
	},
	{
		title: "Fan bracket",
		body: "Hold the chosen bracket (30 / 60 / 80 mm) against the HDMI-side ears. Four M3 × 16 mm screws go through the posts into the captured nuts in NODE 01 and NODE 03. Mount the fan so it blows toward the GPIO side (intake on the HDMI side, exhaust out the open left)."
	},
	{
		title: "Cables",
		body: "USB-C and micro-HDMI leave through the 32 mm gap, then turn front or rear — they never go through the fan. Ethernet and USB exit the open rear. Velcro through the three rear slots on each tray. Leave a service loop so one node unplugs without dragging the stack."
	},
	{
		title: "Service a middle node",
		body: "Unplug that Pi. Unscrew the four top caps. Lift NODE 03 (and its spacers) straight off. Node 02 is now a free tray. microSD, GPIO and USB-C on a live node do not need this — they are reachable from the open sides."
	}
];
var PRINT_GUIDE = {
	printer: PHOTON_MONO_2,
	resin: "ABS-like or tough resin. Standard resin will work for a test tray but is brittle around screw holes.",
	layer: "0.050 mm. 0.050 mm is the sweet spot for the 0.6 mm labels and M3 hex pockets.",
	exposure: "Use the bottle settings for your resin. Do not over-expose holes — they shrink.",
	orientations: [
		{
			part: "Node trays",
			orient: "Largest face on the build plate, bosses and label up. Front SD scoop and slots are through-holes.",
			supports: "None. Optional 1 mm chamfer / elephant-foot compensation on the first 4 layers.",
			notes: "Holes drain. After wash, shoot IPA through every M3 / M2.5 hole with a syringe or squeeze bottle."
		},
		{
			part: "Spacers (inter-tray and lower)",
			orient: "Standing, hole vertical, one end on the plate.",
			supports: "None.",
			notes: "Open tube, no trapped resin. Print 8 + 4 in one file if they fit."
		},
		{
			part: "Base plate",
			orient: "Top up (register collars up). Foot wells and nut counterbores face the FEP / plate.",
			supports: "None.",
			notes: "First layers form the foot wells as shallow pockets — that is correct."
		},
		{
			part: "Knurled top caps",
			orient: "Standing, knurl vertical, hex pocket up.",
			supports: "None.",
			notes: "Press an M3 nut into the pocket while the part is still slightly warm from curing, or tap it in with a vise."
		},
		{
			part: "Fan brackets (30 / 60 / 80)",
			orient: "Plate flat on the bed, posts pointing up. Long side along X (143 mm).",
			supports: "None if gussets rise from the plate. If a gusset has a downward face, add medium supports there only.",
			notes: "The 80 mm plate is the tightest part on the Mono 2 Y axis. Keep a few millimetres of margin; do not scale."
		}
	],
	washCure: [
		"Wash 4–6 minutes in IPA, agitate holes with a soft brush.",
		"Blow or syringe-flush every through-hole until it runs clear. Trapped resin in an M3 hole will ruin the fit.",
		"Dry fully, then cure. Over-curing makes ABS-like resin more brittle — stay on the resin's recommended time.",
		"Tap M3 holes with an M3 tap if a rod feels tight. Do not force a rod through uncured film."
	],
	testPrint: [
		"Print only NODE 01 (the eared tray).",
		"Fit four M2.5 brass standoffs with screws from below.",
		"Drop on a real Pi 4 Model B. All four holes must drop on without springing the board.",
		"Connect Ethernet. The jack must clear the rear lip and the tie slots.",
		"Connect USB-C power. Confirm the cable can leave toward the front of the HDMI-side gap.",
		"Test USB 2/3 access on the rear.",
		"Test both micro-HDMI ports.",
		"Probe the GPIO with a Dupont jumper from the open left side.",
		"Remove the microSD from the front scoop without lifting the Pi.",
		"Fit the heatsink. Confirm it does not exceed the board pitch you chose.",
		"Temporarily rest a second (unprinted cardboard or the next tray if you have it) above to judge airflow.",
		"Only then print trays 02/03, spacers, base, caps, and one fan bracket."
	]
};
var DESIGN_NOTES = [
	"Trays are screw-together on four M3 rods. Nothing snaps. The stack lifts after four knurled caps come off.",
	"Pi boards sit on real M2.5 brass standoffs, not printed posts. The tray only provides clearance holes.",
	"Fan is a removable 4-point side plate on the HDMI / USB-C edge, stood off so power and video cables turn out the open front/rear of the gap. GPIO stays fully open on the opposite side.",
	"Air blows across all three boards. Tray slots run in the flow direction. No sealed duct.",
	"The base plate carries a 48 × 32 mm M3 expansion pattern for a future accessory bay (HDD, PSU, extra ties). No HDD envelope is assumed.",
	"NODE labels are 0.6 mm embossed block lettering, sized to survive 50 µm resin layers."
];
var G = {
	" ": [],
	"0": [
		[
			1,
			0,
			3,
			1
		],
		[
			1,
			6,
			3,
			1
		],
		[
			0,
			1,
			1,
			5
		],
		[
			4,
			1,
			1,
			5
		]
	],
	"1": [
		[
			2,
			0,
			1,
			7
		],
		[
			1,
			1,
			1,
			1
		],
		[
			1,
			0,
			3,
			1
		]
	],
	"2": [
		[
			0,
			6,
			5,
			1
		],
		[
			4,
			4,
			1,
			2
		],
		[
			0,
			3,
			5,
			1
		],
		[
			0,
			1,
			1,
			2
		],
		[
			0,
			0,
			5,
			1
		]
	],
	"3": [
		[
			0,
			6,
			5,
			1
		],
		[
			4,
			4,
			1,
			2
		],
		[
			1,
			3,
			4,
			1
		],
		[
			4,
			1,
			1,
			2
		],
		[
			0,
			0,
			5,
			1
		]
	],
	N: [
		[
			0,
			0,
			1,
			7
		],
		[
			4,
			0,
			1,
			7
		],
		[
			1,
			4,
			1,
			2
		],
		[
			2,
			3,
			1,
			2
		],
		[
			3,
			2,
			1,
			2
		]
	],
	O: [
		[
			1,
			0,
			3,
			1
		],
		[
			1,
			6,
			3,
			1
		],
		[
			0,
			1,
			1,
			5
		],
		[
			4,
			1,
			1,
			5
		]
	],
	D: [
		[
			0,
			0,
			1,
			7
		],
		[
			1,
			0,
			3,
			1
		],
		[
			1,
			6,
			3,
			1
		],
		[
			4,
			1,
			1,
			5
		]
	],
	E: [
		[
			0,
			0,
			1,
			7
		],
		[
			1,
			0,
			4,
			1
		],
		[
			1,
			3,
			3,
			1
		],
		[
			1,
			6,
			4,
			1
		]
	]
};
var GLYPH_GAP = 1.2;
function glyphRects(ch) {
	return G[ch] ?? G[ch.toUpperCase()] ?? [];
}
function textWidth(text, height) {
	const s = height / 7;
	const n = text.length;
	return (n * 5 + (n - 1) * GLYPH_GAP) * s;
}
function forEachGlyphCell(text, height, cb) {
	const s = height / 7;
	let cursor = -textWidth(text, height) / 2;
	for (const ch of text) {
		for (const [gx, gy, gw, gh] of glyphRects(ch)) cb(cursor + gx * s, (gy - 7 / 2) * s, gw * s, gh * s);
		cursor += 6.2 * s;
	}
}
function mergeGeos(geos) {
	if (geos.length === 0) return new BufferGeometry();
	if (geos.length === 1) {
		const g = geos[0].clone();
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
		const fallback = geos[0].clone();
		fallback.computeVertexNormals();
		return fallback;
	}
	merged.computeVertexNormals();
	return merged;
}
function roundedRectShape(w, h, r, ox = 0, oy = 0) {
	const rr = Math.max(.2, Math.min(r, w / 2 - .05, h / 2 - .05));
	const s = new Shape();
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
function circleHole(cx, cy, d) {
	const p = new Path();
	p.absarc(cx, cy, d / 2, 0, Math.PI * 2, true);
	return p;
}
function hexHole(cx, cy, af) {
	const rv = af / Math.sqrt(3);
	const p = new Path();
	for (let i = 0; i <= 6; i++) {
		const a = i / 6 * Math.PI * 2 + Math.PI / 6;
		const x = cx + rv * Math.cos(a);
		const y = cy + rv * Math.sin(a);
		if (i === 0) p.moveTo(x, y);
		else p.lineTo(x, y);
	}
	p.closePath();
	return p;
}
/** Stadium / obround hole. `along` is the long axis. Winding is CW for Shape holes. */
function stadiumHole(cx, cy, length, width, along) {
	const p = new Path();
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
function extrude(shape, depth, curveSegments = 20) {
	const g = new ExtrudeGeometry(shape, {
		depth,
		bevelEnabled: false,
		curveSegments,
		steps: 1
	});
	g.computeVertexNormals();
	return g;
}
function box(w, h, d, x, y, z) {
	const g = new BoxGeometry(w, h, d);
	g.translate(x, y, z);
	return g;
}
function cyl(r, h, x, y, z, axis = "z", segs = 20) {
	const g = new CylinderGeometry(r, r, h, segs);
	if (axis === "z") g.rotateX(Math.PI / 2);
	if (axis === "x") g.rotateZ(Math.PI / 2);
	g.translate(x, y, z);
	return g;
}
function tube(outerR, innerR, h, x, y, z, axis = "z") {
	const s = new Shape();
	s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
	s.holes.push(circleHole(0, 0, innerR * 2));
	const g = extrude(s, h, 20);
	if (axis === "z") {} else if (axis === "y") g.rotateX(-Math.PI / 2);
	else g.rotateY(Math.PI / 2);
	g.translate(x, y, z);
	return g;
}
function airflowSlots(p) {
	const holes = [];
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
	if (xBack - (xRearHole + 7) > p.slotWidth + 4) holes.push(stadiumHole(rearCx, slotCy, slotLen, p.slotWidth, "y"));
	return holes;
}
function cableTieHoles(p) {
	const L = layout(p);
	const cx = p.trayLength - L.rearMargin / 2;
	return [
		p.piOffsetY + 12,
		p.trayWidth / 2,
		p.piOffsetY + p.piWidth - 12
	].map((cy) => stadiumHole(cx, cy, p.tieSlotLength, p.tieSlotWidth, "y"));
}
function sdScoop(p) {
	return stadiumHole(5.5, p.piOffsetY + 22.15 + 6, 16, 9, "y");
}
function trayPlateShape(p) {
	const L = layout(p);
	const s = roundedRectShape(p.trayLength, p.trayWidth, p.trayCornerRadius);
	for (const [x, y] of L.rodXY) s.holes.push(circleHole(x, y, p.m3Clearance));
	for (const [x, y] of L.piHoles) s.holes.push(circleHole(x, y, p.m25Clearance));
	for (const h of airflowSlots(p)) s.holes.push(h);
	for (const h of cableTieHoles(p)) s.holes.push(h);
	s.holes.push(sdScoop(p));
	return s;
}
function labelGeom(text, p) {
	const geos = [];
	forEachGlyphCell(text, p.labelHeight, (x, y, w, h) => {
		geos.push(box(w, h, p.labelDepth, x + w / 2, y + h / 2, p.labelDepth / 2));
	});
	if (geos.length === 0) return new BufferGeometry();
	const g = mergeGeos(geos);
	g.rotateZ(0);
	g.translate(p.trayLength / 2, p.trayWidth - 4.6, p.trayThickness);
	return g;
}
function bosses(p) {
	const L = layout(p);
	const geos = L.rodXY.map(([x, y]) => tube(p.bossDiameter / 2, p.m3Clearance / 2, p.bossHeight, x, y, p.trayThickness, "z"));
	const collars = L.rodXY.map(([x, y]) => {
		const s = roundedRectShape(p.bossDiameter + 2.4, p.bossDiameter + 2.4, 2.4, -p.bossDiameter / 2 - 1.2, -p.bossDiameter / 2 - 1.2);
		s.holes.push(circleHole(0, 0, p.m3Clearance));
		const g = extrude(s, .9);
		g.translate(x, y, p.trayThickness);
		return g;
	});
	return mergeGeos([...geos, ...collars]);
}
function earPair(p) {
	const L = layout(p);
	const parts = [];
	const zH = p.earThickness;
	const nutAf = p.m3NutAf + p.printTolerance * 2 + .3;
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
		const gusset = new Shape();
		gusset.moveTo(-3.2, 0);
		gusset.lineTo(3.2, 0);
		gusset.lineTo(1.4, -p.earProtrude + 1);
		gusset.lineTo(-1.4, -p.earProtrude + 1);
		gusset.closePath();
		const gg = extrude(gusset, 1.6);
		gg.translate(x, 0, .2);
		parts.push(og, ig, gg);
	}
	return mergeGeos(parts);
}
function buildTray(p, label, withEars) {
	const parts = [
		extrude(trayPlateShape(p), p.trayThickness),
		bosses(p),
		labelGeom(label, p)
	];
	if (withEars) parts.push(earPair(p));
	return mergeGeos(parts);
}
function buildSpacer(p, height) {
	const outer = p.spacerOd / 2;
	const inner = p.m3Clearance / 2;
	return mergeGeos([tube(outer, inner, height, 0, 0, 0, "z"), tube(outer - .15, inner, .4, 0, 0, height - .4, "z")]);
}
function buildBase(p) {
	const L = layout(p);
	const s = roundedRectShape(p.trayLength, p.trayWidth, p.trayCornerRadius);
	for (const [x, y] of L.rodXY) s.holes.push(circleHole(x, y, p.m3Clearance));
	const exp = expansionHoles(p);
	for (const [x, y] of exp) s.holes.push(circleHole(x, y, p.m3Clearance));
	s.holes.push(stadiumHole(p.trayLength / 2, p.trayWidth / 2 + 18, 28, 8, "x"));
	s.holes.push(stadiumHole(p.trayLength / 2, p.trayWidth / 2 - 18, 28, 8, "x"));
	const plate = extrude(s, p.baseThickness);
	const feetWells = [];
	const collars = L.rodXY.map(([x, y]) => tube(p.spacerOd / 2 + .4, p.m3Clearance / 2, .8, x, y, p.baseThickness, "z"));
	labelGeom("NODE", {
		...p,
		labelHeight: 4.2,
		labelDepth: .45
	}).translate(0, -p.trayWidth / 2 + 9, p.baseThickness - p.trayThickness);
	const nutRings = L.rodXY.map(([x, y]) => tube(4.2, p.m3Clearance / 2, .6, x, y, 0, "z"));
	for (const [x, y] of L.rodXY) {
		const fx = x < p.trayLength / 2 ? 11 : p.trayLength - 11;
		const fy = y < p.trayWidth / 2 ? 11 : p.trayWidth - 11;
		feetWells.push(tube(p.footDiameter / 2 + .8, p.footDiameter / 2 - .6, .5, fx, fy, 0, "z"));
	}
	return mergeGeos([
		plate,
		...collars,
		...nutRings,
		...feetWells
	]);
}
function expansionHoles(p) {
	const cx = p.trayLength / 2;
	const cy = p.trayWidth / 2;
	const dx = 24;
	const dy = 16;
	return [
		[cx - dx, cy - dy],
		[cx + dx, cy - dy],
		[cx - dx, cy + dy],
		[cx + dx, cy + dy]
	];
}
function buildTopCap(p) {
	const nutAf = p.m3NutAf + p.printTolerance * 2 + .25;
	const s = new Shape();
	s.absarc(0, 0, p.topCapOd / 2, 0, Math.PI * 2, false);
	s.holes.push(circleHole(0, 0, p.m3Clearance));
	const body = extrude(s, p.topCapHeight);
	const ribs = [];
	for (let i = 0; i < 16; i++) {
		const a = i / 16 * Math.PI * 2;
		const g = box(.9, 1.1, p.topCapHeight - 1.2, 0, 0, (p.topCapHeight - 1.2) / 2 + .4);
		g.rotateZ(a);
		g.translate(Math.cos(a) * (p.topCapOd / 2 - .15), Math.sin(a) * (p.topCapOd / 2 - .15), 0);
		ribs.push(g);
	}
	const top = new Shape();
	top.absarc(0, 0, p.topCapOd / 2 - 1.2, 0, Math.PI * 2, false);
	top.holes.push(hexHole(0, 0, nutAf));
	return mergeGeos([body, ...ribs]);
}
function fanPlateShape(p, size) {
	const spec = FAN_SPECS[size];
	const L = layout(p);
	const plateW = p.trayLength;
	const plateH = Math.max(spec.size + 10, L.fanMountZ[1] - L.fanMountZ[0] + 18);
	const s = roundedRectShape(plateW, plateH, 5, 0, 0);
	const fanCx = plateW / 2;
	const fanCy = plateH / 2;
	s.holes.push(circleHole(fanCx, fanCy, spec.cutout));
	const hs = spec.holeSpacing / 2;
	for (const dx of [-hs, hs]) for (const dy of [-hs, hs]) s.holes.push(circleHole(fanCx + dx, fanCy + dy, spec.holeDia));
	const mountY0 = (plateH - (L.fanMountZ[1] - L.fanMountZ[0])) / 2;
	const mountY1 = mountY0 + (L.fanMountZ[1] - L.fanMountZ[0]);
	s.holes.push(circleHole(L.earX[0], mountY0, p.m3Clearance));
	s.holes.push(circleHole(L.earX[1], mountY0, p.m3Clearance));
	s.holes.push(circleHole(L.earX[0], mountY1, p.m3Clearance));
	s.holes.push(circleHole(L.earX[1], mountY1, p.m3Clearance));
	if (plateW > spec.size + 28) {
		const side = (plateW - spec.cutout) / 4;
		s.holes.push(stadiumHole(side, fanCy, plateH * .42, 8, "y"));
		s.holes.push(stadiumHole(plateW - side, fanCy, plateH * .42, 8, "y"));
	}
	return s;
}
function fanPosts(p, size) {
	const spec = FAN_SPECS[size];
	const L = layout(p);
	const mountY0 = (Math.max(spec.size + 10, L.fanMountZ[1] - L.fanMountZ[0] + 18) - (L.fanMountZ[1] - L.fanMountZ[0])) / 2;
	const mountY1 = mountY0 + (L.fanMountZ[1] - L.fanMountZ[0]);
	const posts = [];
	const coords = [
		[L.earX[0], mountY0],
		[L.earX[1], mountY0],
		[L.earX[0], mountY1],
		[L.earX[1], mountY1]
	];
	const postW = 8.2;
	for (const [x, y] of coords) {
		const s = roundedRectShape(postW, postW, 1.4, -8.2 / 2, -8.2 / 2);
		s.holes.push(circleHole(0, 0, p.m3Clearance));
		const g = extrude(s, p.fanStandoff);
		g.translate(x, y, p.fanPlateThickness);
		posts.push(g);
		const gus = new Shape();
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
function buildFanBracket(p, size) {
	const plate = extrude(fanPlateShape(p, size), p.fanPlateThickness);
	const posts = fanPosts(p, size);
	const spec = FAN_SPECS[size];
	const L = layout(p);
	const mountY0 = (Math.max(spec.size + 10, L.fanMountZ[1] - L.fanMountZ[0] + 18) - (L.fanMountZ[1] - L.fanMountZ[0])) / 2;
	return mergeGeos([
		plate,
		posts,
		...[mountY0, mountY0 + (L.fanMountZ[1] - L.fanMountZ[0])].flatMap((y) => L.earX.map((x) => tube(6.2, p.m3Clearance / 2, 1.6, x, y, p.fanPlateThickness, "z")))
	]);
}
function fanPlateSize(p, size) {
	const spec = FAN_SPECS[size];
	const L = layout(p);
	return {
		plateW: p.trayLength,
		plateH: Math.max(spec.size + 10, L.fanMountZ[1] - L.fanMountZ[0] + 18),
		spec
	};
}
function buildRod(p) {
	const L = layout(p);
	return cyl(1.45, L.rodLength, 0, 0, L.rodLength / 2, "z", 12);
}
function buildStandoff(p) {
	return tube(2.25, 1.15, p.standoffHeight, 0, 0, 0, "z");
}
var PRINTABLE = [
	{
		id: "tray-01",
		name: "Node tray 01",
		qty: 1,
		notes: "Blue — ears + NODE 01"
	},
	{
		id: "tray-02",
		name: "Node tray 02",
		qty: 1,
		notes: "Green — no ears"
	},
	{
		id: "tray-03",
		name: "Node tray 03",
		qty: 1,
		notes: "Red — ears + NODE 03"
	},
	{
		id: "spacer",
		name: "Inter-tray spacer",
		qty: 8,
		notes: "Tube, print standing"
	},
	{
		id: "lower-spacer",
		name: "Lower spacer",
		qty: 4,
		notes: "Base to NODE 01"
	},
	{
		id: "base",
		name: "Base / expansion plate",
		qty: 1,
		notes: "Feet + M3 expansion"
	},
	{
		id: "top-cap",
		name: "Knurled top cap",
		qty: 4,
		notes: "Tool-free stack lift"
	},
	{
		id: "fan-30",
		name: "30 mm fan adapter",
		qty: 1,
		notes: "CanaKit temporary"
	},
	{
		id: "fan-60",
		name: "60 mm fan bracket",
		qty: 1,
		notes: "Quiet long-term"
	},
	{
		id: "fan-80",
		name: "80 mm fan bracket",
		qty: 1,
		notes: "Preferred cooling"
	}
];
function buildPrintable(p, id) {
	switch (id) {
		case "tray-01": return buildTray(p, NODE_LABELS[0], true);
		case "tray-02": return buildTray(p, NODE_LABELS[1], false);
		case "tray-03": return buildTray(p, NODE_LABELS[2], true);
		case "spacer": return buildSpacer(p, layout(p).spacerH);
		case "lower-spacer": return buildSpacer(p, p.lowerSpacerH);
		case "base": return buildBase(p);
		case "top-cap": return buildTopCap(p);
		case "fan-30": return buildFanBracket(p, 30);
		case "fan-60": return buildFanBracket(p, 60);
		case "fan-80": return buildFanBracket(p, 80);
	}
}
function partBBox(geo) {
	geo.computeBoundingBox();
	const b = geo.boundingBox;
	const size = new Vector3();
	b.getSize(size);
	return {
		w: size.x,
		d: size.y,
		h: size.z,
		min: b.min.clone(),
		max: b.max.clone()
	};
}
function n(v, d = 3) {
	if (Number.isInteger(v)) return String(v);
	return v.toFixed(d).replace(/\.?0+$/, "");
}
function buildOpenScad(p) {
	const L = layout(p);
	const f30 = FAN_SPECS[30];
	const f60 = FAN_SPECS[60];
	const f80 = FAN_SPECS[80];
	return `// NodeRack — parametric 3-node Raspberry Pi 4 Model B mini server rack
// Resin-optimized for Anycubic Photon Mono 2 (143 × 89 × 165 mm)
//
// Official Pi 4B mechanicals: 85 × 56 mm PCB, 58 × 49 mm M2.5 hole pattern,
// 3.5 mm insets, Ø 2.7 mm holes (HAT spec).
//
// Usage
//   1. Open in OpenSCAD 2021.01 or later.
//   2. Customizer: pick 'part' to export a single printable, or 'assembly'.
//   3. F6 render, File → Export → STL.
//   4. Do NOT export pi_ref / assembly as a printable.
//
// Hardware is screw-together (M3 rods + printed spacers, M2.5 brass standoffs).
// No snap fits, no living hinges, no thin clips.

$fn = 48;
overlap = 0.05;

/* [Export] */
part = "assembly"; // ["assembly", "exploded", "tray_1", "tray_2", "tray_3", "spacer", "lower_spacer", "base", "top_cap", "fan_30", "fan_60", "fan_80", "pi_ref"]
show_pi = true;
show_heatsink = true;
show_fan = true;
fan_choice = ${p.fanSize}; // [30, 60, 80]
explode_gap = 18;

/* [Pi board — official] */
pi_length = ${n(p.piLength)};
pi_width = ${n(p.piWidth)};
pi_thickness = ${n(p.piThickness)};
pi_corner_r = ${n(p.piCornerRadius)};
pi_hole_d = ${n(p.piHoleDia)};
pi_hole_inset_x = ${n(p.piHoleInsetX)};
pi_hole_inset_y = ${n(p.piHoleInsetY)};
pi_hole_spacing_x = ${n(p.piHoleSpacingX)};
pi_hole_spacing_y = ${n(p.piHoleSpacingY)};

/* [Tray] */
tray_length = ${n(p.trayLength)};
tray_width = ${n(p.trayWidth)};
tray_thickness = ${n(p.trayThickness)};
tray_corner_r = ${n(p.trayCornerRadius)};
pi_offset_x = ${n(p.piOffsetX)};
pi_offset_y = ${n(p.piOffsetY)};
label_depth = ${n(p.labelDepth)};
label_height = ${n(p.labelHeight)};

/* [Hardware] */
m25_clear = ${n(p.m25Clearance)};
m3_clear = ${n(p.m3Clearance)};
m3_nut_af = ${n(p.m3NutAf)};
print_tol = ${n(p.printTolerance)};
boss_d = ${n(p.bossDiameter)};
boss_h = ${n(p.bossHeight)};
boss_inset = ${n(p.bossInset)};
standoff_h = ${n(p.standoffHeight)};
board_pitch = ${n(p.boardPitch)};
lower_spacer_h = ${n(p.lowerSpacerH)};
base_t = ${n(p.baseThickness)};
spacer_od = ${n(p.spacerOd)};
top_cap_h = ${n(p.topCapHeight)};
top_cap_od = ${n(p.topCapOd)};
foot_d = ${n(p.footDiameter)};
foot_recess = ${n(p.footRecess)};
foot_protrude = ${n(p.footProtrude)};

/* [Cooling] */
fan_standoff = ${n(p.fanStandoff)};
fan_plate_t = ${n(p.fanPlateThickness)};
heatsink_size = ${n(p.heatsinkSize)};
heatsink_h = ${n(p.heatsinkHeight)};
slot_w = ${n(p.slotWidth)};
slot_count = ${p.slotCount};
tie_slot_l = ${n(p.tieSlotLength)};
tie_slot_w = ${n(p.tieSlotWidth)};
ear_w = ${n(p.earWidth)};
ear_protrude = ${n(p.earProtrude)};
ear_t = ${n(p.earThickness)};

spacer_h = board_pitch - tray_thickness;
rear_margin = tray_length - pi_length - pi_offset_x;
z_base = foot_protrude;
z_n1 = z_base + base_t + lower_spacer_h;
ear_x = [14, tray_length - 14];

// ---- primitives ----------------------------------------------------------

module rounded_rect(l, w, r) {
  offset(r = r) offset(delta = -r) square([l, w], center = false);
}

module obround(length, width) {
  r = width / 2;
  hull() {
    translate([0, -length / 2 + r]) circle(r = r);
    translate([0,  length / 2 - r]) circle(r = r);
  }
}

module hexagon(af) {
  r = af / sqrt(3);
  rotate([0, 0, 30]) circle(r = r, $fn = 6);
}

function rod_xy() = [
  [boss_inset, boss_inset],
  [tray_length - boss_inset, boss_inset],
  [boss_inset, tray_width - boss_inset],
  [tray_length - boss_inset, tray_width - boss_inset]
];

function pi_holes() = [
  [pi_offset_x + pi_hole_inset_x, pi_offset_y + pi_hole_inset_y],
  [pi_offset_x + pi_hole_inset_x + pi_hole_spacing_x, pi_offset_y + pi_hole_inset_y],
  [pi_offset_x + pi_hole_inset_x, pi_offset_y + pi_hole_inset_y + pi_hole_spacing_y],
  [pi_offset_x + pi_hole_inset_x + pi_hole_spacing_x, pi_offset_y + pi_hole_inset_y + pi_hole_spacing_y]
];

function expansion_holes() = let (cx = tray_length / 2, cy = tray_width / 2)
  [[cx - 24, cy - 16], [cx + 24, cy - 16], [cx - 24, cy + 16], [cx + 24, cy + 16]];

module airflow_slots_2d() {
  y0 = pi_offset_y + pi_hole_inset_y + 6.5;
  y1 = pi_offset_y + pi_hole_inset_y + pi_hole_spacing_y - 6.5;
  slot_len = max(18, y1 - y0);
  cy = (y0 + y1) / 2;
  x0 = pi_offset_x + pi_hole_inset_x + 7;
  x1 = pi_offset_x + pi_hole_inset_x + pi_hole_spacing_x - 7;
  n = max(3, slot_count - 1);
  span = x1 - x0;
  for (i = [0 : n - 1]) {
    cx = n == 1 ? (x0 + x1) / 2 : x0 + i * span / (n - 1);
    translate([cx, cy]) obround(slot_len, slot_w);
  }
  rear_cx = (pi_offset_x + pi_hole_inset_x + pi_hole_spacing_x + 7 + pi_offset_x + pi_length - 7) / 2;
  translate([rear_cx, cy]) obround(slot_len, slot_w);
}

module cable_slots_2d() {
  cx = tray_length - rear_margin / 2;
  for (cy = [pi_offset_y + 12, tray_width / 2, pi_offset_y + pi_width - 12])
    translate([cx, cy]) obround(tie_slot_l, tie_slot_w);
}

module sd_scoop_2d() {
  translate([5.5, pi_offset_y + 22.15 + 6]) obround(16, 9);
}

// ---- printable: tray -----------------------------------------------------

module tray_plate_2d() {
  difference() {
    rounded_rect(tray_length, tray_width, tray_corner_r);
    for (h = rod_xy()) translate(h) circle(d = m3_clear);
    for (h = pi_holes()) translate(h) circle(d = m25_clear);
    airflow_slots_2d();
    cable_slots_2d();
    sd_scoop_2d();
  }
}

module bosses() {
  for (h = rod_xy()) {
    translate([h[0], h[1], tray_thickness])
      difference() {
        union() {
          cylinder(d = boss_d + 2.4, h = 0.9);
          translate([0, 0, 0.9 - overlap]) cylinder(d = boss_d, h = boss_h);
        }
        translate([0, 0, -overlap]) cylinder(d = m3_clear, h = boss_h + 2);
      }
  }
}

module ear_at(x) {
  nut_af = m3_nut_af + print_tol * 2 + 0.3;
  translate([x, 0, 0]) {
    // captured nut: outer lip (circular) + inner hex pocket, protruding −Y
    difference() {
      hull() {
        translate([-ear_w / 2 + 1.1, -ear_protrude, 1.1])
          rotate([-90, 0, 0]) cylinder(r = 1.1, h = ear_protrude);
        translate([ ear_w / 2 - 1.1, -ear_protrude, 1.1])
          rotate([-90, 0, 0]) cylinder(r = 1.1, h = ear_protrude);
        translate([-ear_w / 2 + 1.1, -ear_protrude, ear_t - 1.1])
          rotate([-90, 0, 0]) cylinder(r = 1.1, h = ear_protrude);
        translate([ ear_w / 2 - 1.1, -ear_protrude, ear_t - 1.1])
          rotate([-90, 0, 0]) cylinder(r = 1.1, h = ear_protrude);
      }
      translate([0,  overlap, ear_t / 2])
        rotate([90, 0, 0]) cylinder(d = m3_clear, h = ear_protrude + 1);
      translate([0, -2.4, ear_t / 2])
        rotate([90, 0, 0]) linear_extrude(ear_protrude) hexagon(nut_af);
    }
    // gusset
    hull() {
      translate([-3, 0, 0.4]) cube([6, 0.4, 1.6]);
      translate([-1.2, -ear_protrude + 1.5, 0.4]) cube([2.4, 0.4, 1.6]);
    }
  }
}

module tray_label(txt) {
  translate([tray_length / 2, tray_width - 4.6, tray_thickness])
    linear_extrude(label_depth)
      text(txt, size = label_height, font = "Liberation Sans:style=Bold",
           halign = "center", valign = "center", spacing = 1.05);
}

module node_tray(txt = "NODE 01", ears = false) {
  union() {
    linear_extrude(tray_thickness) tray_plate_2d();
    bosses();
    tray_label(txt);
    if (ears) {
      ear_at(ear_x[0]);
      ear_at(ear_x[1]);
    }
  }
}

// ---- printable: spacers / caps / base ------------------------------------

module spacer(h) {
  difference() {
    cylinder(d = spacer_od, h = h);
    translate([0, 0, -overlap]) cylinder(d = m3_clear, h = h + 2 * overlap);
    translate([0, 0, h - 0.4]) cylinder(d1 = spacer_od - 0.4, d2 = spacer_od + 0.2, h = 0.45);
  }
}

module top_cap() {
  difference() {
    union() {
      cylinder(d = top_cap_od, h = top_cap_h);
      for (i = [0 : 15])
        rotate([0, 0, i * 22.5])
          translate([top_cap_od / 2 - 0.2, 0, 0.5])
            cube([1.0, 1.1, top_cap_h - 1.2], center = true);
    }
    translate([0, 0, -overlap]) cylinder(d = m3_clear, h = top_cap_h + 1);
    translate([0, 0, top_cap_h - 2.8])
      linear_extrude(3) hexagon(m3_nut_af + print_tol * 2 + 0.25);
  }
}

module base_plate() {
  difference() {
    union() {
      linear_extrude(base_t) difference() {
        rounded_rect(tray_length, tray_width, tray_corner_r);
        for (h = rod_xy()) translate(h) circle(d = m3_clear);
        for (h = expansion_holes()) translate(h) circle(d = m3_clear);
        translate([tray_length / 2, tray_width / 2 + 18]) rotate([0, 0, 90]) obround(28, 8);
        translate([tray_length / 2, tray_width / 2 - 18]) rotate([0, 0, 90]) obround(28, 8);
      }
      for (h = rod_xy())
        translate([h[0], h[1], base_t])
          difference() {
            cylinder(d = spacer_od + 0.8, h = 0.8);
            translate([0, 0, -overlap]) cylinder(d = m3_clear, h = 2);
          }
    }
    // rubber-foot wells on the bottom (open to the bed)
    for (h = rod_xy()) {
      fx = h[0] < tray_length / 2 ? 11 : tray_length - 11;
      fy = h[1] < tray_width / 2 ? 11 : tray_width - 11;
      translate([fx, fy, -overlap]) cylinder(d = foot_d, h = foot_recess + overlap);
    }
    // nut counterbores under rod holes
    for (h = rod_xy())
      translate([h[0], h[1], -overlap])
        linear_extrude(2.2) hexagon(m3_nut_af + print_tol * 2 + 0.3);
  }
}

// ---- printable: fan brackets ---------------------------------------------

module fan_bracket(size = 80) {
  spec_size = size;
  hole_sp = size == 30 ? ${f30.holeSpacing} : size == 60 ? ${f60.holeSpacing} : ${f80.holeSpacing};
  hole_d  = size == 30 ? ${f30.holeDia} : size == 60 ? ${f60.holeDia} : ${f80.holeDia};
  cutout  = size == 30 ? ${f30.cutout} : size == 60 ? ${f60.cutout} : ${f80.cutout};
  plate_w = tray_length;
  mount_span_z = 2 * board_pitch;
  plate_h = max(spec_size + 10, mount_span_z + 18);
  mount_y0 = (plate_h - mount_span_z) / 2;
  mount_y1 = mount_y0 + mount_span_z;
  fan_cx = plate_w / 2;
  fan_cy = plate_h / 2;

  difference() {
    union() {
      linear_extrude(fan_plate_t) difference() {
        rounded_rect(plate_w, plate_h, 5);
        translate([fan_cx, fan_cy]) circle(d = cutout);
        for (dx = [-hole_sp / 2, hole_sp / 2])
          for (dy = [-hole_sp / 2, hole_sp / 2])
            translate([fan_cx + dx, fan_cy + dy]) circle(d = hole_d);
        for (xx = ear_x) {
          translate([xx, mount_y0]) circle(d = m3_clear);
          translate([xx, mount_y1]) circle(d = m3_clear);
        }
        if (plate_w > spec_size + 28) {
          side = (plate_w - cutout) / 4;
          translate([side, fan_cy]) obround(plate_h * 0.42, 8);
          translate([plate_w - side, fan_cy]) obround(plate_h * 0.42, 8);
        }
      }
      // reinforced pads + posts + gussets (4 attachment points, no skinny arms)
      for (xx = ear_x)
        for (yy = [mount_y0, mount_y1]) {
          translate([xx, yy, fan_plate_t]) {
            difference() {
              union() {
                cylinder(d = 12.4, h = 1.6);
                translate([0, 0, 1.6 - overlap])
                  hull() {
                    translate([-4.1, -4.1, 0]) cube([8.2, 8.2, 0.2]);
                    translate([-4.1, -4.1, fan_standoff - 1.6]) cube([8.2, 8.2, 0.2]);
                  }
              }
              translate([0, 0, -overlap]) cylinder(d = m3_clear, h = fan_standoff + 2);
            }
            // gusset
            hull() {
              translate([-4, 0, 0]) cube([8, 1.6, 0.4]);
              translate([-2, 0, 8]) cube([4, 1.6, 0.4]);
            }
          }
        }
    }
  }
}

// ---- Pi 4 reference (NOT printable) --------------------------------------

module pi4_board() {
  color("#2F6B3C") difference() {
    hull() {
      translate([pi_corner_r, pi_corner_r, 0]) cylinder(r = pi_corner_r, h = pi_thickness);
      translate([pi_length - pi_corner_r, pi_corner_r, 0]) cylinder(r = pi_corner_r, h = pi_thickness);
      translate([pi_corner_r, pi_width - pi_corner_r, 0]) cylinder(r = pi_corner_r, h = pi_thickness);
      translate([pi_length - pi_corner_r, pi_width - pi_corner_r, 0]) cylinder(r = pi_corner_r, h = pi_thickness);
    }
    for (x = [pi_hole_inset_x, pi_hole_inset_x + pi_hole_spacing_x])
      for (y = [pi_hole_inset_y, pi_hole_inset_y + pi_hole_spacing_y])
        translate([x, y, -overlap]) cylinder(d = pi_hole_d, h = pi_thickness + 1);
  }
  t = pi_thickness;
  color("#C5CCD3") {
    translate([6.7, -1.25, t]) cube([9, 7.4, 3.2]);          // USB-C
    translate([26.0, -1.7, t]) cube([7.1, 8.1, 3.5]);        // micro-HDMI 0
    translate([39.5, -1.7, t]) cube([7.1, 8.1, 3.5]);        // micro-HDMI 1
    translate([54.4, -0.4, t + 3]) rotate([90, 0, 0]) cylinder(d = 6.5, h = 6);
    translate([85 + 3 - 21.2, 45.75 - 8, t - 0.4]) cube([21.2, 16, 13.6]); // ETH
  }
  color("#4A7A3A") translate([85 + 3 - 17.5, 9 - 7.25, t - 0.4]) cube([17.5, 14.5, 16]);
  color("#1A1D21") {
    translate([85 + 3 - 17.5, 27 - 7.25, t - 0.4]) cube([17.5, 14.5, 16]);
    translate([7.1, 50.0, t]) cube([51, 5.1, 8.5]);          // GPIO
    translate([21.75, 25, t]) cube([15, 15, 2.4]);           // SoC
  }
  color("#D4A017") {
    translate([59.5, 48.6, t]) cube([5, 4.8, 8.5]);          // PoE
    translate([2.75, 17, t]) cube([2.5, 22, 5.5]);           // DSI
    translate([41.5, 11.5, t]) cube([22, 2.5, 5.5]);         // CSI
  }
  color("#C5CCD3") translate([-1.2, 22.15, -1.8]) cube([14, 12, 1.8]); // microSD
}

module heatsink() {
  s = heatsink_size;
  translate([29.25 - s / 2, 32.5 - s / 2, pi_thickness + 2.4]) {
    cube([s, s, 1.2]);
    for (i = [0 : 7])
      translate([1 + i * (s - 2) / 7, 0.6, 1.2]) cube([0.7, s - 1.2, heatsink_h - 1.2]);
  }
}

module pi_on_tray() {
  translate([pi_offset_x, pi_offset_y, tray_thickness + standoff_h]) {
    pi4_board();
    if (show_heatsink) heatsink();
  }
  color("#C9A227")
    for (h = pi_holes())
      translate([h[0], h[1], tray_thickness])
        difference() {
          cylinder(d = 4.5, h = standoff_h);
          translate([0, 0, -overlap]) cylinder(d = 2.2, h = standoff_h + 1);
        }
}

// ---- assembly ------------------------------------------------------------

module rods() {
  color("#A0AEC0")
    for (h = rod_xy())
      translate([h[0], h[1], z_base - 2.4])
        cylinder(d = 3, h = ${n(L.rodLength)});
}

module fan_in_place(size = 80) {
  mount_span_z = 2 * board_pitch;
  plate_h = max(size + 10, mount_span_z + 18);
  extra_below = (plate_h - mount_span_z) / 2 - tray_thickness / 2;
  translate([0, -fan_standoff, z_n1 - extra_below])
    rotate([90, 0, 0])
      fan_bracket(size);
}

module stack(exploded = false) {
  gap = exploded ? explode_gap : 0;
  translate([0, 0, 0]) {
    color("#4A5568") translate([0, 0, z_base]) base_plate();
    color("#CBD5E0")
      for (h = rod_xy())
        translate([h[0], h[1], z_base + base_t]) spacer(lower_spacer_h);
  }
  colors = ["#2B6CB0", "#2F9E62", "#C44536"];
  labels = ["NODE 01", "NODE 02", "NODE 03"];
  ears   = [true, false, true];
  for (i = [0 : 2]) {
    z = z_n1 + i * (board_pitch + gap);
    color(colors[i]) translate([0, 0, z]) node_tray(labels[i], ears[i]);
    if (show_pi) translate([0, 0, z]) pi_on_tray();
    if (i < 2)
      color("#CBD5E0")
        for (h = rod_xy())
          translate([h[0], h[1], z + tray_thickness]) spacer(spacer_h);
  }
  color("#E2E8F0")
    for (h = rod_xy())
      translate([h[0], h[1], z_n1 + 2 * (board_pitch + gap) + tray_thickness])
        top_cap();
  rods();
  if (show_fan) color("#D69E2E") fan_in_place(fan_choice);
}

// ---- entry ---------------------------------------------------------------

if      (part == "tray_1")       node_tray("NODE 01", true);
else if (part == "tray_2")       node_tray("NODE 02", false);
else if (part == "tray_3")       node_tray("NODE 03", true);
else if (part == "spacer")       spacer(spacer_h);
else if (part == "lower_spacer") spacer(lower_spacer_h);
else if (part == "base")         base_plate();
else if (part == "top_cap")      top_cap();
else if (part == "fan_30")       fan_bracket(30);
else if (part == "fan_60")       fan_bracket(60);
else if (part == "fan_80")       fan_bracket(80);
else if (part == "pi_ref")       pi4_board();
else if (part == "exploded")     stack(true);
else                             stack(false);

echo(str("spacer_h = ", spacer_h));
echo(str("rod length ≈ ", ${n(L.rodLength)}, " mm"));
echo(str("Photon Mono 2 comfortable: 140 × 85 × 160 mm"));
`;
}
var useCad = create((set) => ({
	params: { ...DEFAULT_PARAMS },
	view: "assembled",
	part: "tray-01",
	fan: 80,
	showPi: true,
	showHeatsink: true,
	showFan: true,
	showHardware: true,
	showGrid: true,
	explode: 22,
	inspector: "params",
	setParam: (key, value) => set((s) => ({ params: {
		...s.params,
		[key]: value,
		fanSize: key === "fanSize" ? value : s.params.fanSize
	} })),
	setParams: (params) => set({ params }),
	reset: () => set({
		params: { ...DEFAULT_PARAMS },
		fan: 80
	}),
	setView: (view) => set({ view }),
	setPart: (part) => set({
		part,
		view: "part"
	}),
	setFan: (fan) => set((s) => ({
		fan,
		params: {
			...s.params,
			fanSize: fan
		}
	})),
	setInspector: (inspector) => set({ inspector }),
	toggle: (k) => set((s) => ({ [k]: !s[k] })),
	setExplode: (explode) => set({ explode })
}));
function sev(ok, warn) {
	if (!ok) return "fail";
	if (warn) return "warn";
	return "pass";
}
function validate(p) {
	const L = layout(p);
	const checks = [];
	const holeDx = p.piHoleSpacingX;
	const holeDy = p.piHoleSpacingY;
	checks.push({
		id: "pi-pattern",
		group: "Pi mounting",
		name: "Official 58 × 49 mm M2.5 pattern",
		severity: holeDx === 58 && holeDy === 49 && p.piHoleInsetX === 3.5 && p.piHoleInsetY === 3.5 ? "pass" : "warn",
		detail: `Holes at inset (${p.piHoleInsetX}, ${p.piHoleInsetY}) mm, spacing ${holeDx} × ${holeDy} mm. Four tray holes match.`,
		spec: "HAT mechanical + Pi 4B drawing"
	});
	checks.push({
		id: "m25-clearance",
		group: "Pi mounting",
		name: "M2.5 clearance through tray",
		severity: p.m25Clearance >= 2.8 && p.m25Clearance <= 3.1 ? "pass" : "warn",
		detail: `Ø ${p.m25Clearance.toFixed(2)} mm (PCB hole is Ø 2.7 mm). Sized for brass F-F standoffs, not printed posts.`,
		spec: "M2.5 clearance 2.8–3.0 mm"
	});
	const rodR = 1.5;
	const pcbCorner = [p.piOffsetX + p.piCornerRadius, p.piOffsetY + p.piCornerRadius];
	const rod = L.rodXY[0];
	const rodToPcb = Math.hypot(pcbCorner[0] - rod[0], pcbCorner[1] - rod[1]) - p.piCornerRadius - rodR;
	checks.push({
		id: "rod-pcb",
		group: "Pi safety",
		name: "M3 rods clear the PCB",
		severity: sev(rodToPcb > 1, rodToPcb < 2),
		detail: `Nearest rod-to-PCB clearance ${rodToPcb.toFixed(2)} mm (corner radius accounted).`,
		spec: "≥ 1.0 mm, prefer ≥ 2.0 mm"
	});
	const standoffR = 2.3;
	const bossR = p.bossDiameter / 2;
	const hole0 = L.piHoles[0];
	const bossToStandoff = Math.hypot(hole0[0] - rod[0], hole0[1] - rod[1]) - bossR - standoffR;
	checks.push({
		id: "boss-standoff",
		group: "Pi mounting",
		name: "Corner boss vs M2.5 standoff",
		severity: sev(bossToStandoff > 1.5, bossToStandoff < 2.5),
		detail: `XY gap ${bossToStandoff.toFixed(2)} mm. Pi flies ${p.standoffHeight.toFixed(1)} mm above the tray so bosses (${p.bossHeight.toFixed(1)} mm) cannot touch the PCB.`,
		spec: "≥ 1.5 mm XY, Z already clear"
	});
	const nextTrayBottom = L.spacerH;
	const hsClear = nextTrayBottom - (p.standoffHeight + p.piThickness + p.heatsinkHeight);
	checks.push({
		id: "heatsink",
		group: "Cooling",
		name: "Heatsink to tray above",
		severity: sev(hsClear > 2, hsClear < 5),
		detail: `${hsClear.toFixed(1)} mm above a ${p.heatsinkSize} × ${p.heatsinkHeight} mm sink. Board pitch ${p.boardPitch} mm.`,
		spec: "≥ 2 mm, prefer ≥ 5 mm"
	});
	const gpioClear = nextTrayBottom - (p.standoffHeight + p.piThickness + 8.5);
	checks.push({
		id: "gpio",
		group: "Service",
		name: "GPIO header access",
		severity: sev(gpioClear > 5, gpioClear < 8),
		detail: `${gpioClear.toFixed(1)} mm above the 40-pin header. Left (GPIO) side of the rack is fully open; Dupont housings route out the side.`,
		spec: "≥ 5 mm vertical, open left side"
	});
	const sdZ = p.standoffHeight - 1.8;
	checks.push({
		id: "sd",
		group: "Service",
		name: "microSD removal",
		severity: sev(sdZ > 3 && p.piOffsetX >= 8, p.piOffsetX < 10),
		detail: `Card sits ${sdZ.toFixed(1)} mm above the tray in a ${p.standoffHeight} mm standoff gap. Front lip ${p.piOffsetX} mm with an SD finger scoop. Card pulls toward the front of the rack.`,
		spec: "Unobstructed −X pull, ≥ 8 mm front lip"
	});
	checks.push({
		id: "usbc",
		group: "Cables",
		name: "USB-C plug + bend room",
		severity: sev(p.fanStandoff >= 24, p.fanStandoff < 30),
		detail: `Fan plate stands ${p.fanStandoff} mm off the HDMI edge. USB-C overhangs ~1.3 mm; a straight plug is ~18 mm. Remaining ~${(p.fanStandoff - 20).toFixed(0)} mm to bend the cable out the front or rear of the gap.`,
		spec: "≥ 24 mm standoff, prefer 30–34 mm"
	});
	checks.push({
		id: "hdmi",
		group: "Cables",
		name: "micro-HDMI access",
		severity: sev(p.fanStandoff >= 26, p.fanStandoff < 32),
		detail: `Two micro-HDMI ports on the HDMI edge. ${p.fanStandoff} mm gap. Chunky official cables may want a slim or right-angle adapter; slim cables fit.`,
		spec: "≥ 26 mm, 32 mm designed"
	});
	const rear = L.rearMargin;
	checks.push({
		id: "eth-usb",
		group: "Cables",
		name: "Ethernet / USB plug room",
		severity: sev(rear >= 6, rear < 8),
		detail: `Jacks overhang the PCB by 3 mm. Tray rear margin ${rear.toFixed(1)} mm, no rear wall. Plugs have free air; three Velcro/tie slots sit in the rear lip.`,
		spec: "Open rear, ≥ 6 mm tray margin"
	});
	const fanInner = p.fanStandoff;
	checks.push({
		id: "fan-pi",
		group: "Cooling",
		name: "Fan hardware vs Pi",
		severity: sev(fanInner > 12, fanInner < 22),
		detail: `Four thick posts, no skinny cantilevers. Inner plate face is ${fanInner} mm from the tray HDMI edge, so it cannot hit USB-C, HDMI, or the 3.5 mm jack.`,
		spec: "No contact, ≥ 12 mm"
	});
	const bossWall = (p.bossDiameter - p.m3Clearance) / 2;
	checks.push({
		id: "wall-boss",
		group: "Resin",
		name: "Wall around M3 hole",
		severity: sev(bossWall >= 2.5, bossWall < 3),
		detail: `${bossWall.toFixed(2)} mm of material around each M3 rod hole (boss Ø ${p.bossDiameter} mm).`,
		spec: "≥ 2.5 mm, prefer 3 mm"
	});
	const spacerWall = (p.spacerOd - p.m3Clearance) / 2;
	checks.push({
		id: "wall-spacer",
		group: "Resin",
		name: "Spacer tube wall",
		severity: sev(spacerWall >= 2.5, spacerWall < 3),
		detail: `${spacerWall.toFixed(2)} mm wall, open ID so resin drains.`,
		spec: "≥ 2.5 mm"
	});
	checks.push({
		id: "tray-th",
		group: "Resin",
		name: "Tray structural thickness",
		severity: sev(p.trayThickness >= 2.5, p.trayThickness < 3),
		detail: `${p.trayThickness.toFixed(1)} mm plate, through-slots for drainage, no suction-cup cavities.`,
		spec: "≥ 2.5 mm, target 3 mm"
	});
	checks.push({
		id: "pitch",
		group: "Cooling",
		name: "Vertical clearance between boards",
		severity: sev(p.boardPitch >= 28 && p.boardPitch <= 36, p.boardPitch < 30 || p.boardPitch > 32),
		detail: `Tray-to-tray pitch ${p.boardPitch} mm (PCB-to-PCB same). Spacer ${L.spacerH.toFixed(1)} mm.`,
		spec: "28–32 mm target"
	});
	for (const part of PRINTABLE) try {
		const geo = buildPrintable(p, part.id);
		const b = partBBox(geo);
		geo.dispose();
		const dims = [
			b.w,
			b.d,
			b.h
		].sort((a, c) => c - a);
		const fitComfort = dims[0] <= PHOTON_MONO_2.comfortableX && dims[1] <= PHOTON_MONO_2.comfortableY && dims[2] <= PHOTON_MONO_2.comfortableZ || dims[0] <= PHOTON_MONO_2.comfortableX && dims[2] <= PHOTON_MONO_2.comfortableY && dims[1] <= PHOTON_MONO_2.comfortableZ;
		const fitAbs = dims[0] <= PHOTON_MONO_2.x && dims[1] <= PHOTON_MONO_2.y && dims[2] <= PHOTON_MONO_2.z;
		checks.push({
			id: `print-${part.id}`,
			group: "Photon Mono 2",
			name: `${part.name} build volume`,
			severity: sev(fitAbs, !fitComfort),
			detail: `BBox ${b.w.toFixed(1)} × ${b.d.toFixed(1)} × ${b.h.toFixed(1)} mm. Comfortable envelope ${PHOTON_MONO_2.comfortableX} × ${PHOTON_MONO_2.comfortableY} × ${PHOTON_MONO_2.comfortableZ} mm.`,
			spec: `${PHOTON_MONO_2.name} 143 × 89 × 165 mm`
		});
	} catch (err) {
		checks.push({
			id: `print-${part.id}`,
			group: "Photon Mono 2",
			name: `${part.name} build volume`,
			severity: "fail",
			detail: `Could not tessellate: ${err instanceof Error ? err.message : String(err)}`,
			spec: "Part must tessellate"
		});
	}
	const fan = fanPlateSize(p, p.fanSize);
	checks.push({
		id: "fan-plate-y",
		group: "Photon Mono 2",
		name: "Active fan bracket on the bed",
		severity: sev(fan.plateH <= PHOTON_MONO_2.y, fan.plateH > PHOTON_MONO_2.comfortableY),
		detail: `${p.fanSize} mm bracket plate ${fan.plateW.toFixed(1)} × ${fan.plateH.toFixed(1)} mm. Print flat, posts up. Align the long side to X (143 mm).`,
		spec: "Y ≤ 85 mm comfortable, 89 mm absolute"
	});
	checks.push({
		id: "service-unstack",
		group: "Service",
		name: "Single-node service",
		severity: "pass",
		detail: "Four knurled top caps unscrew by hand. Lift NODE 03 (and spacers) straight off the rods to reach NODE 02. Cables have service loops at the rear. microSD, USB-C, HDMI and GPIO on a live node do not require unstacking.",
		spec: "No snap fits; screw-together only"
	});
	checks.push({
		id: "no-snap",
		group: "Structure",
		name: "No snap-fits / living hinges",
		severity: "pass",
		detail: "M3 rods + nuts + printed spacers. M2.5 brass standoffs for the Pis. Fan uses 4 captured M3 nuts. Nothing relies on resin flex.",
		spec: "Screw-together, serviceable"
	});
	return checks;
}
function summary(checks) {
	return {
		pass: checks.filter((c) => c.severity === "pass").length,
		warn: checks.filter((c) => c.severity === "warn").length,
		fail: checks.filter((c) => c.severity === "fail").length,
		total: checks.length
	};
}
var exporter = new STLExporter();
function geometryToStl(geo, name) {
	const mesh = new Mesh(geo);
	mesh.name = name;
	const data = exporter.parse(mesh, { binary: true });
	if (data instanceof ArrayBuffer) return data;
	if (typeof data === "string") {
		const buf = new TextEncoder().encode(data);
		return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
	}
	const view = data;
	return view.buffer.slice(view.byteOffset, view.byteOffset + view.byteLength);
}
function stlBlob(geo, name) {
	return new Blob([geometryToStl(geo, name)], { type: "model/stl" });
}
async function buildZip(p) {
	const zip = new import_lib.default();
	const folder = zip.folder("noderack-pi4-cluster");
	folder.file("noderack.scad", buildOpenScad(p));
	folder.file("BOM.txt", bomText(p));
	folder.file("VALIDATION.txt", validationText(p));
	folder.file("README.txt", readmeText(p));
	const stls = folder.folder("stl");
	for (const part of PRINTABLE) {
		const geo = buildPrintable(p, part.id);
		const view = geometryToStl(geo, part.id);
		geo.dispose();
		stls.file(`noderack-${part.id}.stl`, view);
	}
	return zip.generateAsync({ type: "blob" });
}
function bomText(p) {
	const rows = buildBom(p);
	return [
		"NodeRack — Raspberry Pi 4 Model B 3-node rack",
		"Bill of materials (from current parameters)",
		"",
		"Qty  Item                              Spec",
		"---  --------------------------------  --------------------------------",
		...rows.map((r) => `${String(r.qty).padStart(3, " ")}  ${r.item.padEnd(32, " ")}  ${r.spec}`),
		"",
		...rows.map((r) => `  - ${r.item}: ${r.notes}`)
	].join("\n");
}
function validationText(p) {
	const checks = validate(p);
	const s = summary(checks);
	return [
		`NodeRack mechanical validation   pass ${s.pass}  warn ${s.warn}  fail ${s.fail}`,
		"",
		...checks.map((c) => `[${c.severity.toUpperCase().padEnd(4, " ")}] ${c.group} / ${c.name}\n        ${c.detail}\n        spec: ${c.spec}`)
	].join("\n\n");
}
function readmeText(p) {
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
PRINTABLE.map((p) => `noderack-${p.id}.stl`);
var TABS = [
	{
		id: "params",
		label: "Params"
	},
	{
		id: "bom",
		label: "BOM"
	},
	{
		id: "assemble",
		label: "Assemble"
	},
	{
		id: "print",
		label: "Print"
	},
	{
		id: "validate",
		label: "Validate"
	},
	{
		id: "source",
		label: "Source"
	}
];
function Inspector() {
	const tab = useCad((s) => s.inspector);
	const setTab = useCad((s) => s.setInspector);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex h-full min-h-0 flex-col border-l border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-0.5 overflow-x-auto border-b border-border px-2 py-2",
			children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setTab(t.id),
				className: cn("shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium", tab === t.id ? "bg-secondary text-fg" : "text-muted hover:text-fg"),
				children: t.label
			}, t.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "min-h-0 flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [
					tab === "params" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamsPanel, {}),
					tab === "bom" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BomPanel, {}),
					tab === "assemble" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssemblePanel, {}),
					tab === "print" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrintPanel, {}),
					tab === "validate" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValidatePanel, {}),
					tab === "source" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourcePanel, {})
				]
			})
		})]
	});
}
function ParamsPanel() {
	const params = useCad((s) => s.params);
	const setParam = useCad((s) => s.setParam);
	const reset = useCad((s) => s.reset);
	const groups = [...new Set(PARAM_META.map((m) => m.group))];
	const L = layout(params);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "Parameters"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "Official Pi 4B holes stay at 58 × 49 mm unless you deliberately change them."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: reset,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "Reset"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-2 rounded-lg bg-bg p-3 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-subtle",
						children: "Spacer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-mono tabular-nums text-fg",
						children: mm(L.spacerH)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-subtle",
						children: "Rod"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "font-mono tabular-nums text-fg",
						children: [L.rodLength, " mm"]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-subtle",
						children: "Envelope"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "font-mono tabular-nums text-fg",
						children: [
							L.overallDepth.toFixed(0),
							" × ",
							L.overallWidth.toFixed(0),
							" × ",
							L.overallHeight.toFixed(0)
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-subtle",
						children: "Rear lip"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-mono tabular-nums text-fg",
						children: mm(L.rearMargin)
					})] })
				]
			}),
			groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[11px] font-medium uppercase tracking-[0.14em] text-subtle",
					children: g
				}), PARAM_META.filter((m) => m.group === g).map((m) => {
					const value = Number(params[m.key]);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-baseline justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: m.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono tabular-nums text-muted",
								children: [value.toFixed(m.step < 1 ? 2 : 1), m.unit ? ` ${m.unit}` : ""]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: m.min,
							max: m.max,
							step: m.step,
							value,
							onChange: (e) => setParam(m.key, Number(e.target.value)),
							className: "h-8 w-full accent-fg"
						})]
					}, m.key);
				})]
			}, g))
		]
	});
}
function BomPanel() {
	const params = useCad((s) => s.params);
	const fan = useCad((s) => s.fan);
	const rows = (0, import_react.useMemo)(() => buildBom(params, fan), [params, fan]);
	const cut = rodCutList(params);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-medium",
			children: "Bill of materials"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-xs text-muted",
			children: [
				"Cut list: buy ",
				cut.buy,
				", cut each rod to ",
				cut.cutTo,
				"."
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-left text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "text-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "pb-2 font-medium",
					children: "Qty"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "pb-2 font-medium",
					children: "Item"
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t border-border align-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "py-2 pr-2 font-mono tabular-nums",
					children: r.qty
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
					className: "py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-fg",
							children: r.item
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted",
							children: r.spec
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-subtle",
							children: r.notes
						})
					]
				})]
			}, r.item)) })]
		})]
	});
}
function AssemblePanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium",
				children: "Assembly"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-4",
				children: ASSEMBLE_STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-[11px] tabular-nums",
						children: i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: s.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs leading-relaxed text-muted",
						children: s.body
					})] })]
				}, s.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2 border-t border-border pt-4",
				children: DESIGN_NOTES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-xs leading-relaxed text-muted",
					children: n
				}, n))
			})
		]
	});
}
function PrintPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium",
				children: "Resin print — Photon Mono 2"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted",
				children: [
					"Comfortable envelope ",
					PRINT_GUIDE.printer.comfortableX,
					" × ",
					PRINT_GUIDE.printer.comfortableY,
					" ×",
					" ",
					PRINT_GUIDE.printer.comfortableZ,
					" mm. ",
					PRINT_GUIDE.resin,
					" Layer ",
					PRINT_GUIDE.layer
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-[11px] font-medium uppercase tracking-[0.14em] text-subtle",
				children: "Test print first"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-2 flex flex-col gap-1.5",
				children: PRINT_GUIDE.testPrint.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2 text-xs leading-relaxed text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono tabular-nums text-subtle",
						children: [i + 1, "."]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s })]
				}, s))
			})] }),
			PRINT_GUIDE.orientations.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg bg-bg p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: o.part
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: o.orient
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: ["Supports: ", o.supports]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-subtle",
						children: o.notes
					})
				]
			}, o.part)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-[11px] font-medium uppercase tracking-[0.14em] text-subtle",
				children: "Wash & cure"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 flex flex-col gap-1.5",
				children: PRINT_GUIDE.washCure.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-xs leading-relaxed text-muted",
					children: s
				}, s))
			})] })
		]
	});
}
function ValidatePanel() {
	const params = useCad((s) => s.params);
	const checks = (0, import_react.useMemo)(() => validate(params), [params]);
	const s = summary(checks);
	const Icon = {
		pass: Check,
		warn: TriangleAlert,
		fail: CircleX
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-medium",
			children: "Mechanical validation"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 font-mono text-xs tabular-nums text-muted",
			children: [
				s.pass,
				" pass · ",
				s.warn,
				" warn · ",
				s.fail,
				" fail · ",
				s.total,
				" checks"
			]
		})] }), checks.map((c) => {
			const I = Icon[c.severity];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: cn("mt-0.5 size-3.5 shrink-0", c.severity === "pass" && "text-ok", c.severity === "warn" && "text-warn", c.severity === "fail" && "text-danger") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs font-medium",
					children: [c.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 font-normal text-subtle",
						children: c.group
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs leading-relaxed text-muted",
					children: c.detail
				})] })]
			}, c.id);
		})]
	});
}
function SourcePanel() {
	const params = useCad((s) => s.params);
	const scad = (0, import_react.useMemo)(() => buildOpenScad(params), [params]);
	const [copied, setCopied] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "OpenSCAD source"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: async () => {
						await navigator.clipboard.writeText(scad);
						setCopied(true);
						setTimeout(() => setCopied(false), 1200);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), copied ? "Copied" : "Copy"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					"Customizer-ready. Set ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono",
						children: "part"
					}),
					" to export a single STL. Pi reference geometry is preview-only."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "max-h-[28rem] overflow-auto rounded-lg bg-bg p-3 font-mono text-[10px] leading-relaxed text-muted",
				children: scad
			})
		]
	});
}
function ExportMenu() {
	const params = useCad((s) => s.params);
	const part = useCad((s) => s.part);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function zip() {
		setBusy(true);
		try {
			downloadBlob(await buildZip(params), "noderack-pi4-cluster.zip");
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: () => void zip(),
				disabled: busy,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), busy ? "Packing…" : "ZIP all"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				onClick: one,
				children: "STL"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				onClick: scad,
				children: "SCAD"
			})
		]
	});
}
function PartRail() {
	const part = useCad((s) => s.part);
	const setPart = useCad((s) => s.setPart);
	const view = useCad((s) => s.view);
	const setView = useCad((s) => s.setView);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1 p-2",
		children: [PRINTABLE.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setPart(p.id),
			className: cn("rounded-md px-2 py-2 text-left text-xs", view === "part" && part === p.id ? "bg-secondary text-fg" : "text-muted hover:text-fg"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-medium",
				children: p.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-[10px] text-subtle",
				children: [
					"×",
					p.qty,
					" · ",
					p.notes
				]
			})]
		}, p.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setView("assembled"),
			className: "mt-1 rounded-md px-2 py-2 text-left text-xs text-muted hover:text-fg",
			children: "Back to assembly"
		})]
	});
}
var Viewer = (0, import_react.lazy)(() => import("./viewer-B6aZV2h3.mjs").then((m) => ({ default: m.Viewer })));
var VIEWS = [
	{
		id: "assembled",
		label: "Assembled"
	},
	{
		id: "exploded",
		label: "Exploded"
	},
	{
		id: "part",
		label: "Part"
	}
];
var FANS = [
	30,
	60,
	80
];
function StudioShell() {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh min-h-0 flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center gap-3 border-b border-border px-3 py-2.5 md:px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-8 w-8 items-center justify-center rounded-md bg-surface ring-1 ring-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium tracking-tight",
								children: "NodeRack"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted",
								children: "Pi 4B · 3-node · Photon Mono 2"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex rounded-lg bg-surface p-0.5 ring-1 ring-border",
						children: VIEWS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setView(v.id),
							className: cn("h-8 rounded-md px-3 text-xs font-medium", view === v.id ? "bg-secondary text-fg" : "text-muted hover:text-fg"),
							children: v.label
						}, v.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 rounded-lg bg-surface p-0.5 ring-1 ring-border",
						children: [FANS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFan(f),
							className: cn("h-8 rounded-md px-2.5 font-mono text-xs tabular-nums", fan === f ? "bg-secondary text-fg" : "text-muted hover:text-fg"),
							children: f
						}, f)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pr-2 text-[10px] text-subtle",
							children: "mm fan"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex flex-wrap items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconToggle, {
								pressed: showPi,
								onClick: () => toggle("showPi"),
								label: "Pi boards",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconToggle, {
								pressed: showHeatsink,
								onClick: () => toggle("showHeatsink"),
								label: "Heatsinks",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconToggle, {
								pressed: showFan,
								onClick: () => toggle("showFan"),
								label: "Fan bracket",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fan, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconToggle, {
								pressed: showHardware,
								onClick: () => toggle("showHardware"),
								label: "Hardware",
								children: showHardware ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconToggle, {
								pressed: showGrid,
								onClick: () => toggle("showGrid"),
								label: "Grid",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid3x3, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {})
						]
					})
				]
			}),
			view === "exploded" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-b border-border bg-surface px-4 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] uppercase tracking-[0.14em] text-subtle",
						children: "Explode"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 40,
						step: 1,
						value: explode,
						onChange: (e) => setExplode(Number(e.target.value)),
						className: "h-8 max-w-xs flex-1 accent-fg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs tabular-nums text-muted",
						children: [explode, " mm"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[168px_minmax(0,1fr)_minmax(280px,360px)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden min-h-0 border-r border-border bg-surface md:flex md:flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-3 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-subtle",
							children: "Printable parts"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-0 flex-1 overflow-y-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartRail, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "relative min-h-[46vh] bg-bg md:min-h-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full bg-bg" }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewer, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute left-3 top-3 rounded-md bg-surface/80 px-2 py-1 text-[10px] text-muted ring-1 ring-border backdrop-blur-sm",
							children: "Drag to orbit · scroll to zoom · Pi boards are preview-only"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-h-0 border-t border-border md:border-t-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inspector, {})
					})
				]
			})
		]
	});
}
function IconToggle({ pressed, onClick, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "icon",
		variant: pressed ? "secondary" : "ghost",
		"aria-pressed": pressed,
		"aria-label": label,
		title: label,
		onClick,
		className: "size-9",
		children
	});
}
//#endregion
export { StudioShell, layout as _, buildRod as a, buildTopCap as c, circleHole as d, extrude as f, NODE_LABELS as g, NODE_COLORS as h, buildPrintable as i, buildTray as l, roundedRectShape as m, buildBase as n, buildSpacer as o, mergeGeos as p, buildFanBracket as r, buildStandoff as s, useCad as t, fanPlateSize as u };
