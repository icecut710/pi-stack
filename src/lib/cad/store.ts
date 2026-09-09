import { create } from "zustand";
import {
  DEFAULT_PARAMS,
  type FanSize,
  type PartId,
  type RackParams,
  type ViewMode,
} from "./params";

export type InspectorTab =
  | "params"
  | "bom"
  | "assemble"
  | "print"
  | "validate"
  | "source";

interface CadState {
  params: RackParams;
  view: ViewMode;
  part: PartId;
  fan: FanSize;
  showPi: boolean;
  showHeatsink: boolean;
  showFan: boolean;
  showHardware: boolean;
  showGrid: boolean;
  explode: number;
  inspector: InspectorTab;
  setParam: <K extends keyof RackParams>(key: K, value: RackParams[K]) => void;
  setParams: (p: RackParams) => void;
  reset: () => void;
  setView: (v: ViewMode) => void;
  setPart: (p: PartId) => void;
  setFan: (f: FanSize) => void;
  setInspector: (t: InspectorTab) => void;
  toggle: (k: "showPi" | "showHeatsink" | "showFan" | "showHardware" | "showGrid") => void;
  setExplode: (n: number) => void;
}

export const useCad = create<CadState>((set) => ({
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
  setParam: (key, value) =>
    set((s) => ({
      params: { ...s.params, [key]: value, fanSize: key === "fanSize" ? (value as FanSize) : s.params.fanSize },
    })),
  setParams: (params) => set({ params }),
  reset: () => set({ params: { ...DEFAULT_PARAMS }, fan: 80 }),
  setView: (view) => set({ view }),
  setPart: (part) => set({ part, view: "part" }),
  setFan: (fan) => set((s) => ({ fan, params: { ...s.params, fanSize: fan } })),
  setInspector: (inspector) => set({ inspector }),
  toggle: (k) => set((s) => ({ [k]: !s[k] })),
  setExplode: (explode) => set({ explode }),
}));
