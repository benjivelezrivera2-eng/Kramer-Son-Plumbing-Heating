import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { PublicRoutes } from "../app/PublicRoutes";

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <PublicRoutes />
    </StaticRouter>,
  );
}
