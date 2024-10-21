import { queryClient } from "@infra/tankstack/queryClient"
import { getTokenPrice } from "@service/api/getTokenPrice"
import { useMutation, useQuery } from "@tanstack/react-query"

type GetTokenPriceProps = {
    params: {
        ids: string
    }
}

const useTokenPriceSymbol = Symbol("useTokenPrice")

export function useTokenPrice() {
    const { mutateAsync, data } = useMutation({
        mutationFn: (props: GetTokenPriceProps) => getTokenPrice(props)
    }, queryClient)

    return {
        data,
        mutateAsync
    }
}