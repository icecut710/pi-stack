import { OrbitControls, Grid, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import {
  buildBase,
  buildFanBracket,
  buildPrintable,
  buildRod,
  buildSpacer,
  buildStandoff,
  buildTopCap,
  buildTray,
  fanPlateSize,
} from "@/lib/cad/geometry";
import { layout, NODE_COLORS, NODE_LABELS, type FanSize, type PartId, type RackParams } from "@/lib/cad/params";
import { buildHeatsink, buildPi4Meshes } from "@/lib/cad/pi4";
import { useCad } from "@/lib/cad/store";

const matCache = new Map<string, THREE.MeshStandardMaterial>();
function mat(color: string, metal = 0.12, rough = 0.45) {
  const k = `${color}|${metal}|${rough}`;
  let m = matCache.get(k);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, metalness: metal, roughness: rough });
    matCache.set(k, m);
  }
  return m;
}

function MeshOf({
  geo,
  color,
  metal,
  rough,
}: {
  geo: THREE.BufferGeometry;
  color: string;
  metal?: number;
  rough?: number;
}) {
  return <mesh geometry={geo} material={mat(color, metal, rough)} castShadow receiveShadow />;
}

interface Geos {
  tray01: THREE.BufferGeometry;
  tray02: THREE.BufferGeometry;
  tray03: THREE.BufferGeometry;
  spacer: THREE.BufferGeometry;
  lower: THREE.BufferGeometry;
  base: THREE.BufferGeometry;
  cap: THREE.BufferGeometry;
  fan: THREE.BufferGeometry;
  rod: THREE.BufferGeometry;
  standoff: THREE.BufferGeometry;
  heatsink: THREE.BufferGeometry;
  pi: ReturnType<typeof buildPi4Meshes>;
}

function useGeos(params: RackParams, fan: FanSize): Geos {
  const geos = useMemo(() => {
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
      pi: buildPi4Meshes(params),
    };
  }, [params, fan]);

  useEffect(() => {
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

function PartPreview({ params, part }: { params: RackParams; part: PartId }) {
  const geo = useMemo(() => buildPrintable(params, part), [params, part]);
  useEffect(() => () => geo.dispose(), [geo]);
  geo.computeBoundingBox();
  const b = geo.boundingBox!;
  const c = new THREE.Vector3();
  b.getCenter(c);
  return (
    <group position={[-c.x, -c.z, -c.y]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <MeshOf geo={geo} color="#c9d1d8" metal={0.08} rough={0.42} />
      </group>
    </group>
  );
}

function Assembled({
  params,
  geos,
  fan,
  showPi,
  showHeatsink,
  showFan,
  showHardware,
  explode,
}: {
  params: RackParams;
  geos: Geos;
  fan: FanSize;
  showPi: boolean;
  showHeatsink: boolean;
  showFan: boolean;
  showHardware: boolean;
  explode: number;
}) {
  const L = layout(params);
  const trays = [geos.tray01, geos.tray02, geos.tray03];
  const { plateH } = fanPlateSize(params, fan);
  const mountSpan = L.fanMountZ[1] - L.fanMountZ[0];
  const extraBelow = (plateH - mountSpan) / 2 - params.trayThickness / 2;

  return (
    <group position={[-L.assemblyCenter[0], 0, L.assemblyCenter[1]]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0, 0, L.zBaseBottom]}>
          <MeshOf geo={geos.base} color="#4a5568" metal={0.15} rough={0.5} />
        </group>

        {L.rodXY.map(([x, y], i) => (
          <group key={`low-${i}`} position={[x, y, L.zBaseTop]}>
            <MeshOf geo={geos.lower} color="#c5cdd4" metal={0.2} rough={0.35} />
          </group>
        ))}

        {trays.map((g, i) => {
          const z = L.zTray[i]! + i * explode;
          return (
            <group key={`t-${i}`}>
              <group position={[0, 0, z]}>
                <MeshOf geo={g} color={NODE_COLORS[i]!} metal={0.08} rough={0.4} />
              </group>
              {showHardware &&
                L.piHoles.map(([hx, hy], hi) => (
                  <group key={`st-${i}-${hi}`} position={[hx, hy, z + params.trayThickness]}>
                    <MeshOf geo={geos.standoff} color="#c9a227" metal={0.7} rough={0.3} />
                  </group>
                ))}
              {showPi && (
                <group
                  position={[
                    params.piOffsetX,
                    params.piOffsetY,
                    z + params.trayThickness + params.standoffHeight,
                  ]}
                >
                  {geos.pi.map((m) => (
                    <MeshOf key={m.name} geo={m.geom} color={m.color} metal={m.metal} rough={m.rough} />
                  ))}
                  {showHeatsink && (
                    <MeshOf geo={geos.heatsink} color="#9aa3ad" metal={0.55} rough={0.28} />
                  )}
                </group>
              )}
              {i < 2 &&
                L.rodXY.map(([x, y], si) => (
                  <group key={`sp-${i}-${si}`} position={[x, y, z + params.trayThickness]}>
                    <MeshOf geo={geos.spacer} color="#c5cdd4" metal={0.2} rough={0.35} />
                  </group>
                ))}
            </group>
          );
        })}

        {L.rodXY.map(([x, y], i) => (
          <group key={`cap-${i}`} position={[x, y, L.zTray[2]! + 2 * explode + params.trayThickness]}>
            <MeshOf geo={geos.cap} color="#e2e8f0" metal={0.12} rough={0.4} />
          </group>
        ))}

        {showHardware &&
          L.rodXY.map(([x, y], i) => (
            <group key={`rod-${i}`} position={[x, y, L.zBaseBottom - 2.4]}>
              <MeshOf geo={geos.rod} color="#8a9baa" metal={0.65} rough={0.25} />
            </group>
          ))}

        {showFan && (
          <group
            position={[0, -params.fanStandoff - explode * 0.6, L.zTray[0]! - extraBelow]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <MeshOf geo={geos.fan} color="#d69e2e" metal={0.12} rough={0.42} />
          </group>
        )}
      </group>
    </group>
  );
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

  if (view === "part") return <PartPreview params={params} part={part} />;
  return (
    <Assembled
      params={params}
      geos={geos}
      fan={fan}
      showPi={showPi}
      showHeatsink={showHeatsink}
      showFan={showFan}
      showHardware={showHardware}
      explode={view === "exploded" ? explode : 0}
    />
  );
}

function Lights() {
  return (
    <>
      <hemisphereLight args={["#dfe6ee", "#1a1d22", 0.62]} />
      <directionalLight position={[90, 140, 70]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-70, 50, -50]} intensity={0.4} />
      <ambientLight intensity={0.2} />
    </>
  );
}

export function Viewer() {
  const showGrid = useCad((s) => s.showGrid);
  const view = useCad((s) => s.view);
  return (
    <Canvas
      className="h-full w-full touch-none"
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [180, 125, 200], fov: 32, near: 0.5, far: 2500 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      onCreated={({ gl }) => gl.setClearColor("#0a0c10")}
    >
      <Lights />
      {showGrid && view !== "part" && (
        <Grid
          args={[400, 400]}
          cellSize={10}
          sectionSize={50}
          cellColor="#1c222b"
          sectionColor="#2a3340"
          fadeDistance={480}
          fadeStrength={1.2}
          infiniteGrid
          position={[0, -0.02, 0]}
        />
      )}
      <Scene />
      <OrbitControls makeDefault enableDamping dampingFactor={0.08} minDistance={40} maxDistance={560} target={[0, 42, 0]} />
      <GizmoHelper alignment="bottom-right" margin={[52, 52]}>
        <GizmoViewport />
      </GizmoHelper>
    </Canvas>
  );
}
