import { FC, ReactNode } from "react";
import { RouterFactory } from "./router";
import { RouteObject, RouterProvider } from "react-router-dom";

type RouterProviderProps = {
    routes: RouteObject[]
}

const RouterProviderComponent: FC<RouterProviderProps> = ({ routes }) => {
    const router = RouterFactory(routes)

    return (
        <RouterProvider router={router}/>
    )
}

export { 
    RouterProviderComponent 
}