import { FAN_SPECS, PHOTON_MONO_2, layout, type RackParams } from "./params";
import { rodCutList } from "./bom";

export const ASSEMBLE_STEPS = [
  {
    title: "Prepare hardware",
    body: "Lay out 4× M3 rods (cut to length), 16× M3 nuts, 8× M3 washers, 12× M2.5 brass F-F standoffs, 24× M2.5 screws, 4 rubber feet, and the printed parts. Press an M3 nut into each knurled top cap and into each fan-ear hex pocket.",
  },
  {
    title: "Base plate",
    body: "Stick the four rubber feet into the corner wells. Drop four M3 nuts into the underside hex counterbores (or thread them onto the rods first). Slide the four rods up through the base. Fit a washer under each nut. Stand the rack on the feet.",
  },
  {
    title: "Lower spacers",
    body: "Drop one lower spacer onto each rod so it seats on the base register collar. These set the expansion-bay gap and raise NODE 01 into the fan window.",
  },
  {
    title: "NODE 01 tray",
    body: "Slide the blue NODE 01 tray down the rods, fan ears toward the HDMI / USB-C side (the side with the power and video connectors). Bosses face up.",
  },
  {
    title: "Mount the first Pi (test this before printing the rest)",
    body: "From under the tray, run M2.5 × 6 mm screws into four brass standoffs. Set the Pi 4B on the standoffs, SD card toward the front scoop, Ethernet / USB toward the rear tie slots. Fasten with four M2.5 × 5 mm screws. Confirm all four holes, then plug Ethernet, USB-C, a micro-HDMI, and pull the microSD.",
  },
  {
    title: "Inter-tray spacers and NODE 02 / 03",
    body: "Four spacers on the rods, green NODE 02, four more spacers, red NODE 03. Same Pi orientation on every level. Fit heatsinks before the tray above goes on.",
  },
  {
    title: "Top caps",
    body: "Washer then knurled cap on each rod. Tighten finger-tight — the caps are the service fasteners. Do not crush the printed bosses.",
  },
  {
    title: "Fan bracket",
    body: "Hold the chosen bracket (30 / 60 / 80 mm) against the HDMI-side ears. Four M3 × 16 mm screws go through the posts into the captured nuts in NODE 01 and NODE 03. Mount the fan so it blows toward the GPIO side (intake on the HDMI side, exhaust out the open left).",
  },
  {
    title: "Cables",
    body: "USB-C and micro-HDMI leave through the 32 mm gap, then turn front or rear — they never go through the fan. Ethernet and USB exit the open rear. Velcro through the three rear slots on each tray. Leave a service loop so one node unplugs without dragging the stack.",
  },
  {
    title: "Service a middle node",
    body: "Unplug that Pi. Unscrew the four top caps. Lift NODE 03 (and its spacers) straight off. Node 02 is now a free tray. microSD, GPIO and USB-C on a live node do not need this — they are reachable from the open sides.",
  },
];

export const PRINT_GUIDE = {
  printer: PHOTON_MONO_2,
  resin: "ABS-like or tough resin. Standard resin will work for a test tray but is brittle around screw holes.",
  layer: "0.050 mm. 0.050 mm is the sweet spot for the 0.6 mm labels and M3 hex pockets.",
  exposure: "Use the bottle settings for your resin. Do not over-expose holes — they shrink.",
  orientations: [
    {
      part: "Node trays",
      orient: "Largest face on the build plate, bosses and label up. Front SD scoop and slots are through-holes.",
      supports: "None. Optional 1 mm chamfer / elephant-foot compensation on the first 4 layers.",
      notes: "Holes drain. After wash, shoot IPA through every M3 / M2.5 hole with a syringe or squeeze bottle.",
    },
    {
      part: "Spacers (inter-tray and lower)",
      orient: "Standing, hole vertical, one end on the plate.",
      supports: "None.",
      notes: "Open tube, no trapped resin. Print 8 + 4 in one file if they fit.",
    },
    {
      part: "Base plate",
      orient: "Top up (register collars up). Foot wells and nut counterbores face the FEP / plate.",
      supports: "None.",
      notes: "First layers form the foot wells as shallow pockets — that is correct.",
    },
    {
      part: "Knurled top caps",
      orient: "Standing, knurl vertical, hex pocket up.",
      supports: "None.",
      notes: "Press an M3 nut into the pocket while the part is still slightly warm from curing, or tap it in with a vise.",
    },
    {
      part: "Fan brackets (30 / 60 / 80)",
      orient: "Plate flat on the bed, posts pointing up. Long side along X (143 mm).",
      supports: "None if gussets rise from the plate. If a gusset has a downward face, add medium supports there only.",
      notes: "The 80 mm plate is the tightest part on the Mono 2 Y axis. Keep a few millimetres of margin; do not scale.",
    },
  ],
  washCure: [
    "Wash 4–6 minutes in IPA, agitate holes with a soft brush.",
    "Blow or syringe-flush every through-hole until it runs clear. Trapped resin in an M3 hole will ruin the fit.",
    "Dry fully, then cure. Over-curing makes ABS-like resin more brittle — stay on the resin's recommended time.",
    "Tap M3 holes with an M3 tap if a rod feels tight. Do not force a rod through uncured film.",
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
    "Only then print trays 02/03, spacers, base, caps, and one fan bracket.",
  ],
};

export function printSummary(p: RackParams) {
  const L = layout(p);
  const cut = rodCutList(p);
  const fan = FAN_SPECS[p.fanSize];
  return {
    rod: cut,
    spacerH: L.spacerH,
    fan,
    envelope: `${L.overallDepth.toFixed(0)} × ${L.overallWidth.toFixed(0)} × ${L.overallHeight.toFixed(0)} mm assembled`,
  };
}

export const DESIGN_NOTES = [
  "Trays are screw-together on four M3 rods. Nothing snaps. The stack lifts after four knurled caps come off.",
  "Pi boards sit on real M2.5 brass standoffs, not printed posts. The tray only provides clearance holes.",
  "Fan is a removable 4-point side plate on the HDMI / USB-C edge, stood off so power and video cables turn out the open front/rear of the gap. GPIO stays fully open on the opposite side.",
  "Air blows across all three boards. Tray slots run in the flow direction. No sealed duct.",
  "The base plate carries a 48 × 32 mm M3 expansion pattern for a future accessory bay (HDD, PSU, extra ties). No HDD envelope is assumed.",
  "NODE labels are 0.6 mm embossed block lettering, sized to survive 50 µm resin layers.",
];
