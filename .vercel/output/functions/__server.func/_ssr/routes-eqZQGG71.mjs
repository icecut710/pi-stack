import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-eqZQGG71.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const [App, setApp] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let live = true;
		import("./shell-B7zOzMOm.mjs").then((m) => {
			if (live) setApp(() => m.StudioShell);
		});
		return () => {
			live = false;
		};
	}, []);
	if (!App) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-dvh items-center justify-center bg-bg text-sm text-muted",
		children: "Loading NodeRack…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {});
}
//#endregion
export { Home as component };
