import { createContext, FC, ReactNode, useState } from "react";

type TokenStoreProps = {
    target?: {
        name: string,
        price: number
    }
    result?: {
        name: string,
        price: number
    }
    set: (state: Omit<TokenStoreProps, "set">) => void;
}

const tokenStore = createContext<TokenStoreProps | null>(null)

type TokenStoreProviderProps = {
    children: ReactNode
}

const TokenStoreProvider: FC<TokenStoreProviderProps> = ({ children }) => {
    const [target, setTarget] = useState<{name: string, price: number}>()
    const [result, setResult] = useState<{name: string, price: number}>()

    const set = (state: Omit<TokenStoreProps, "set">) => {
        setResult(state.result)
        setTarget(state.target)
    }

    return (
        <tokenStore.Provider value={{ target, result, set}}>
            {children}
        </tokenStore.Provider>
    )
}

export {
    tokenStore,
    TokenStoreProvider
}