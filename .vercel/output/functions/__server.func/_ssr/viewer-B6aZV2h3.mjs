import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Canvas, g as Vector3, i as OrbitControls, n as GizmoViewport, p as MeshStandardMaterial, r as GizmoHelper, s as BoxGeometry, t as Grid, u as CylinderGeometry } from "../_libs/@react-three/drei+[...].mjs";
import { _ as layout, a as buildRod, c as buildTopCap, d as circleHole, f as extrude, g as NODE_LABELS, h as NODE_COLORS, i as buildPrintable, l as buildTray, m as roundedRectShape, n as buildBase, o as buildSpacer, p as mergeGeos, r as buildFanBracket, s as buildStandoff, t as useCad, u as fanPlateSize } from "./shell-B7zOzMOm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/viewer-B6aZV2h3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Official Pi 4B reference geometry. Preview only — never exported as STL. */
var PI_GREEN = "#2f6b3c";
var PI_GOLD = "#d4a017";
var PI_METAL = "#c5ccd3";
var PI_BLACK = "#1a1d21";
var PI_USB3 = "#4a7a3a";
function pcbGeom(p) {
	const s = roundedRectShape(p.piLength, p.piWidth, p.piCornerRadius);
	const holes = [
		[p.piHoleInsetX, p.piHoleInsetY],
		[p.piHoleInsetX + p.piHoleSpacingX, p.piHoleInsetY],
		[p.piHoleInsetX, p.piHoleInsetY + p.piHoleSpacingY],
		[p.piHoleInsetX + p.piHoleSpacingX, p.piHoleInsetY + p.piHoleSpacingY]
	];
	for (const [x, y] of holes) s.holes.push(circleHole(x, y, p.piHoleDia));
	return extrude(s, p.piThickness, 16);
}
function boxAt(w, d, h, x, y, z) {
	const g = new BoxGeometry(w, d, h);
	g.translate(x + w / 2, y + d / 2, z + h / 2);
	return g;
}
function cylAt(r, h, x, y, z, axis = "z") {
	const g = new CylinderGeometry(r, r, h, 18);
	if (axis === "z") g.rotateX(Math.PI / 2);
	g.translate(x, y, z + (axis === "z" ? h / 2 : 0));
	return g;
}
function buildPi4Meshes(p) {
	const t = p.piThickness;
	return [
		{
			name: "PCB",
			color: PI_GREEN,
			geom: pcbGeom(p),
			rough: .55,
			metal: .05
		},
		{
			name: "USB-C",
			color: PI_METAL,
			geom: boxAt(9, 7.4, 3.2, 6.7, -1.25, t),
			metal: .7,
			rough: .35
		},
		{
			name: "microHDMI 0",
			color: PI_METAL,
			geom: boxAt(7.1, 8.1, 3.5, 26, -1.7, t),
			metal: .7,
			rough: .35
		},
		{
			name: "microHDMI 1",
			color: PI_METAL,
			geom: boxAt(7.1, 8.1, 3.5, 39.5, -1.7, t),
			metal: .7,
			rough: .35
		},
		{
			name: "AV jack",
			color: PI_METAL,
			geom: cylAt(3.25, 6, 54.4, -.4, t, "y"),
			metal: .65,
			rough: .3
		},
		{
			name: "USB 3.0",
			color: PI_USB3,
			geom: boxAt(17.5, 14.5, 16, 70.5, 1.75, t - .4),
			metal: .15,
			rough: .45
		},
		{
			name: "USB 2.0",
			color: PI_BLACK,
			geom: boxAt(17.5, 14.5, 16, 70.5, 19.75, t - .4),
			metal: .1,
			rough: .5
		},
		{
			name: "Ethernet",
			color: PI_METAL,
			geom: boxAt(21.2, 16, 13.6, 66.8, 37.75, t - .4),
			metal: .45,
			rough: .4
		},
		{
			name: "GPIO",
			color: PI_BLACK,
			geom: boxAt(51, 5.1, 8.5, 7.1, 50, t),
			metal: .05,
			rough: .6
		},
		{
			name: "SoC",
			color: PI_BLACK,
			geom: boxAt(15, 15, 2.4, 21.75, 25, t),
			metal: .2,
			rough: .5
		},
		{
			name: "RAM",
			color: PI_BLACK,
			geom: boxAt(10, 14, 1.1, 40.5, 25.5, t),
			metal: .15,
			rough: .5
		},
		{
			name: "PoE header",
			color: PI_GOLD,
			geom: boxAt(5, 4.8, 8.5, 59.5, 48.6, t),
			metal: .6,
			rough: .35
		},
		{
			name: "DSI",
			color: PI_GOLD,
			geom: boxAt(2.5, 22, 5.5, 2.75, 17, t),
			metal: .5,
			rough: .4
		},
		{
			name: "CSI",
			color: PI_GOLD,
			geom: boxAt(22, 2.5, 5.5, 41.5, 11.5, t),
			metal: .5,
			rough: .4
		},
		{
			name: "microSD",
			color: PI_METAL,
			geom: boxAt(14, 12, 1.8, -1.2, 22.15, -1.8),
			metal: .4,
			rough: .45
		}
	];
}
function buildHeatsink(p) {
	const t = p.piThickness;
	const s = p.heatsinkSize;
	const h = p.heatsinkHeight;
	const cx = 29.25;
	const cy = 32.5;
	const fins = [boxAt(s, s, 1.2, cx - s / 2, cy - s / 2, t + 2.4)];
	const n = 8;
	const fw = .7;
	const step = (s - 2) / 7;
	for (let i = 0; i < n; i++) {
		const x = cx - s / 2 + 1 + i * step;
		fins.push(boxAt(fw, s - 1.2, h - 1.2, x - fw / 2, cy - (s - 1.2) / 2, t + 2.4 + 1.2));
	}
	return mergeGeos(fins);
}
var matCache = /* @__PURE__ */ new Map();
function mat(color, metal = .12, rough = .45) {
	const k = `${color}|${metal}|${rough}`;
	let m = matCache.get(k);
	if (!m) {
		m = new MeshStandardMaterial({
			color,
			metalness: metal,
			roughness: rough
		});
		matCache.set(k, m);
	}
	return m;
}
function MeshOf({ geo, color, metal, rough }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geo,
		material: mat(color, metal, rough),
		castShadow: true,
		receiveShadow: true
	});
}
function useGeos(params, fan) {
	const geos = (0, import_react.useMemo)(() => {
		const L = layout(params);
		return {
			tray01: buildTray(params, NODE_LABELS[0], true),
			tray02: buildTray(params, NODE_LABELS[1], false),
			tray03: buildTray(params, NODE_LABELS[2], true),
			spacer: buildSpacer(params, L.spacerH),
			lower: buildSpacer(params, params.lowerSpacerH),
			base: buildBase(params),
			cap: buildTopCap(params),
			fan: buildFanBracket(params, fan),
			rod: buildRod(params),
			standoff: buildStandoff(params),
			heatsink: buildHeatsink(params),
			pi: buildPi4Meshes(params)
		};
	}, [params, fan]);
	(0, import_react.useEffect)(() => {
		return () => {
			geos.tray01.dispose();
			geos.tray02.dispose();
			geos.tray03.dispose();
			geos.spacer.dispose();
			geos.lower.dispose();
			geos.base.dispose();
			geos.cap.dispose();
			geos.fan.dispose();
			geos.rod.dispose();
			geos.standoff.dispose();
			geos.heatsink.dispose();
			geos.pi.forEach((m) => m.geom.dispose());
		};
	}, [geos]);
	return geos;
}
function PartPreview({ params, part }) {
	const geo = (0, import_react.useMemo)(() => buildPrintable(params, part), [params, part]);
	(0, import_react.useEffect)(() => () => geo.dispose(), [geo]);
	geo.computeBoundingBox();
	const b = geo.boundingBox;
	const c = new Vector3();
	b.getCenter(c);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position: [
			-c.x,
			-c.z,
			-c.y
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshOf, {
				geo,
				color: "#c9d1d8",
				metal: .08,
				rough: .42
			})
		})
	});
}
function Assembled({ params, geos, fan, showPi, showHeatsink, showFan, showHardware, explode }) {
	const L = layout(params);
	const trays = [
		geos.tray01,
		geos.tray02,
		geos.tray03
	];
	const { plateH } = fanPlateSize(params, fan);
	const extraBelow = (plateH - (L.fanMountZ[1] - L.fanMountZ[0])) / 2 - params.trayThickness / 2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position: [
			-L.assemblyCenter[0],
			0,
			L.assemblyCenter[1]
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					position: [
						0,
						0,
						L.zBaseBottom
					],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshOf, {
						geo: geos.base,
						color: "#4a5568",
						metal: .15,
						rough: .5
					})
				}),
				L.rodXY.map(([x, y], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					position: [
						x,
						y,
						L.zBaseTop
					],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshOf, {
						geo: geos.lower,
						color: "#c5cdd4",
						metal: .2,
						rough: .35
					})
				}, `low-${i}`)),
				trays.map((g, i) => {
					const z = L.zTray[i] + i * explode;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
							position: [
								0,
								0,
								z
							],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshOf, {
								geo: g,
								color: NODE_COLORS[i],
								metal: .08,
								rough: .4
							})
						}),
						showHardware && L.piHoles.map(([hx, hy], hi) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
							position: [
								hx,
								hy,
								z + params.trayThickness
							],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshOf, {
								geo: geos.standoff,
								color: "#c9a227",
								metal: .7,
								rough: .3
							})
						}, `st-${i}-${hi}`)),
						showPi && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							position: [
								params.piOffsetX,
								params.piOffsetY,
								z + params.trayThickness + params.standoffHeight
							],
							children: [geos.pi.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshOf, {
								geo: m.geom,
								color: m.color,
								metal: m.metal,
								rough: m.rough
							}, m.name)), showHeatsink && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshOf, {
								geo: geos.heatsink,
								color: "#9aa3ad",
								metal: .55,
								rough: .28
							})]
						}),
						i < 2 && L.rodXY.map(([x, y], si) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
							position: [
								x,
								y,
								z + params.trayThickness
							],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshOf, {
								geo: geos.spacer,
								color: "#c5cdd4",
								metal: .2,
								rough: .35
							})
						}, `sp-${i}-${si}`))
					] }, `t-${i}`);
				}),
				L.rodXY.map(([x, y], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					position: [
						x,
						y,
						L.zTray[2] + 2 * explode + params.trayThickness
					],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshOf, {
						geo: geos.cap,
						color: "#e2e8f0",
						metal: .12,
						rough: .4
					})
				}, `cap-${i}`)),
				showHardware && L.rodXY.map(([x, y], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					position: [
						x,
						y,
						L.zBaseBottom - 2.4
					],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshOf, {
						geo: geos.rod,
						color: "#8a9baa",
						metal: .65,
						rough: .25
					})
				}, `rod-${i}`)),
				showFan && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					position: [
						0,
						-params.fanStandoff - explode * .6,
						L.zTray[0] - extraBelow
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshOf, {
						geo: geos.fan,
						color: "#d69e2e",
						metal: .12,
						rough: .42
					})
				})
			]
		})
	});
}
function Scene() {
	const params = useCad((s) => s.params);
	const view = useCad((s) => s.view);
	const part = useCad((s) => s.part);
	const fan = useCad((s) => s.fan);
	const showPi = useCad((s) => s.showPi);
	const showHeatsink = useCad((s) => s.showHeatsink);
	const showFan = useCad((s) => s.showFan);
	const showHardware = useCad((s) => s.showHardware);
	const explode = useCad((s) => s.explode);
	const geos = useGeos(params, fan);
	if (view === "part") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartPreview, {
		params,
		part
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Assembled, {
		params,
		geos,
		fan,
		showPi,
		showHeatsink,
		showFan,
		showHardware,
		explode: view === "exploded" ? explode : 0
	});
}
function Lights() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#dfe6ee",
			"#1a1d22",
			.62
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				90,
				140,
				70
			],
			intensity: 1.4,
			castShadow: true,
			"shadow-mapSize": [1024, 1024]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				-70,
				50,
				-50
			],
			intensity: .4
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .2 })
	] });
}
function Viewer() {
	const showGrid = useCad((s) => s.showGrid);
	const view = useCad((s) => s.view);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		className: "h-full w-full touch-none",
		shadows: true,
		dpr: [1, 1.75],
		camera: {
			position: [
				180,
				125,
				200
			],
			fov: 32,
			near: .5,
			far: 2500
		},
		gl: {
			antialias: true,
			toneMapping: 4
		},
		onCreated: ({ gl }) => gl.setClearColor("#0a0c10"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lights, {}),
			showGrid && view !== "part" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
				args: [400, 400],
				cellSize: 10,
				sectionSize: 50,
				cellColor: "#1c222b",
				sectionColor: "#2a3340",
				fadeDistance: 480,
				fadeStrength: 1.2,
				infiniteGrid: true,
				position: [
					0,
					-.02,
					0
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
				makeDefault: true,
				enableDamping: true,
				dampingFactor: .08,
				minDistance: 40,
				maxDistance: 560,
				target: [
					0,
					42,
					0
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GizmoHelper, {
				alignment: "bottom-right",
				margin: [52, 52],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GizmoViewport, {})
			})
		]
	});
}
//#endregion
export { Viewer };
