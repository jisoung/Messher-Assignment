import axios from "axios"

type GetTokenPriceProps = {
    params: {
        ids: string
    }
}

export const getTokenPrice = async (props: GetTokenPriceProps) => {
    const res = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
        params: {
            "vs_currencies": "USD",
            "ids": props.params.ids
        }
    })

    return res;
}