import { ChangeEventHandler, FC, MouseEventHandler, useContext, useEffect, useState } from "react";
import WhiteEmpty from "@asset/svg/White-empty.svg"
import TokenList from "@constant/token.json"
import { useTokenPrice } from "@hook/api/useTokenPrice";
import { tokenStore } from "@store/tokenStore";
import "./TokenDialog.scss"

type TokenDialogProps = {
    isActive: boolean;
    selectType: "target" | "result"
    toggleActive: () => void
}

const TokenDialog: FC<TokenDialogProps> = (props) => {
    const [tokenList, setTokenList] = useState(TokenList)
    const tokenCtx = useContext(tokenStore)
    const { mutateAsync } = useTokenPrice()

    const onClickBackground: MouseEventHandler<HTMLElement> = (event) => {
        props.toggleActive()
    }

    const onClickToken = (ids: string): MouseEventHandler<HTMLElement> => () => {
        mutateAsync({ params: { ids }}).then((res) => {
            if (props.selectType === "result") {
                tokenCtx?.set({
                    result: {
                        name: ids,
                        price: res.data[ids]['usd']
                    }, 
                    target: tokenCtx.target 
                })
            } else {
                tokenCtx?.set({
                    target: {
                        name: ids,
                        price: res.data[ids]['usd']
                    }, 
                    result: tokenCtx.result 
                })
            }
            props.toggleActive()
        })   
    }

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.currentTarget.value
        if (value === "") {
            setTokenList(TokenList)
            return
        }
        setTokenList((prev) => prev.filter((item) => item.name.includes(value) || item.name.includes(value)))
    }

    return (
        <>
            <main 
                className={props.isActive ? "TokenDialog-container" : "TokenDialog-container--disabled"}
            >
                <section className="TokenDialog-section">
                    <h1>토큰 선택</h1>
                    <input className="TokenDialog-input" placeholder="이름 선택 또는 주소 붙여 넣기" onChange={onChange}/>
                    {/* <article className="TokenDialog-recent_token_list">
                        {(new Array(10)).fill(0).map(() => (
                            <div className="TokenDialog-recent_token">ETH</div>
                        ))}
                    </article> */}
                    <div className="TokenDialog-divide"/>
                    <article className="TokenDialog-token_list">
                        {tokenList.map((token) => (
                            <div className="TokenDialog-token" onClick={(e) => onClickToken(token.symbol)(e)}>
                                <div className="TokenDialog-token_left_section">
                                    <WhiteEmpty width={30} height={30}/>
                                    <div className="TokenDialog-token_title">
                                        <p>{token.name}</p>
                                        <p>{token.symbol}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </article>
                    <button className="TokenDialog-button" onClick={() => alert("준비중입니다.")}>토큰 목록 관리</button>
                </section>
                <div className="TokenDialog-background" onClick={onClickBackground}/>
            </main>
        </>
    )
}

export default TokenDialog;