import { renderToString } from "react-dom/server";
import Router from "./Router";
export { pages, routes } from "./pages/catalog";
export function render(path="/") { return renderToString(<Router path={path}/>); }
