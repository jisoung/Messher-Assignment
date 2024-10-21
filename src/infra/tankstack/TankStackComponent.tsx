import { QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { queryClient } from "./queryClient";

type TankstackComponentProps = {
    children: ReactNode
}

const TankstackComponent: FC<TankstackComponentProps> = ({ children }) => {
    

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export { 
    TankstackComponent 
}