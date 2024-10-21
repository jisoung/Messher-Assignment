import { createBrowserRouter, RouteObject } from "react-router-dom";

function RouterFactory(routes: RouteObject[]) {
    return createBrowserRouter(routes, {})
}

export {
    RouterFactory
}