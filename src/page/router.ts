import { RouteObject } from "react-router-dom";
import IndexPage from ".";

const router: RouteObject[] = [
    {
        path: "/",
        Component: IndexPage
    }
]

export {
    router
}