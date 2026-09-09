import { FAN_SPECS, layout, type RackParams } from "./params";

function n(v: number, d = 3) {
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(d).replace(/\.?0+$/, "");
}

export function buildOpenScad(p: RackParams): string {
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
