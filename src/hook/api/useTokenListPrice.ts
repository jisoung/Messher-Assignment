import { queryClient } from "@infra/tankstack/queryClient"
import { getTokenPrice } from "@service/api/getTokenPrice"
import { useQueries, useQuery } from "@tanstack/react-query"

type GetTokenPriceProps = {
    params: {
        ids: string[]
    }
}

const useTokenPriceSymbol = Symbol("useTokenPrice")

export function useTokenListPrice(props: GetTokenPriceProps) {
    const results = useQueries({
        queries: props.params.ids.map((id) => ({
            queryKey: [useTokenPriceSymbol],
            queryFn: () => getTokenPrice({ params: { ids: id }})
        }))
    }, queryClient)

    return results;
}