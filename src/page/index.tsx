import { ChangeEventHandler, FC, MouseEventHandler, useContext, useEffect, useState } from "react";
import WhiteSetting from "@asset/svg/white-setting.svg"
import WhiteDownArrow from "@asset/svg/white-down-arrow.svg"
import WhiteEmpty from "@asset/svg/White-empty.svg"
import WhiteDownHalfArrow from "@asset/svg/white-down-half-arrow.svg"
import WhiteInfo from "@asset/svg/white-info-icon.svg"
import TokenDialog from "@component/TokenDialog";
import "./index.scss"
import { tokenStore, TokenStoreProvider } from "@store/tokenStore";

type SwapInputForm = {
    targetInputValue: number
    resultInputValue: number
}

const IndexPage: FC = () => {
    const tokenCtx = useContext(tokenStore)
    const [swapInputForm, setSwapInputForm] = useState<SwapInputForm>({
        resultInputValue: 0,
        targetInputValue: 0
    })
    const [isActive, setIsActive] = useState(false);
    const [selectType, setSelectType] = useState<"result" | "target">("target")

    const toggleActive = (type: "result" | "target") => () => {
        setSelectType(type)
        setIsActive((prev) => !prev)
    }
    
    const onChangeTargetPriceInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        let value = event.currentTarget?.valueAsNumber;
        if (value == null || isNaN(value) || value < 0) return;

        const result = tokenCtx?.result?.price;
        const target = tokenCtx?.target?.price;
        let opresult: number

        if (result && target) {
            opresult = Math.floor(target / result * value * 1e10) / 1e10
        }


        
        if (result && target) {
            setSwapInputForm((prev) => ({ targetInputValue: value, resultInputValue: opresult }));
        } else {
            setSwapInputForm((prev) => ({...prev, targetInputValue: value}));
        }
    }
    
    const onChangeResultInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        let value = event.currentTarget?.valueAsNumber;
        if (value == null || isNaN(value) || value < 0) return;

        const result = tokenCtx?.result?.price;
        const target = tokenCtx?.target?.price;
        let opresult: number

        if (result && target) {
            opresult = Math.floor(result / target * value * 1e10) / 1e10
        }
        
        if (result && target) {
            setSwapInputForm((prev) => ({ resultInputValue: value, targetInputValue: opresult }));
        } else {
            setSwapInputForm((prev) => ({...prev, resultInputValue: value}));
        }
    }
    
    return (
        <>
            <main className="IndexPage-container">
                <section className="IndexPage-swap_section">
                    <article className="IndexPage-swap_head">
                        <h1 className="IndexPage-swap_head_title">스왑</h1>
                        <WhiteSetting width={30} height={30} className="IndexPage-swap_setting_icon" onClick={() => alert("준비중입니다.")}/>
                    </article>
                    <section className="IndexPage-swap_input_section">
                        <article className="IndexPage-swap_input_section_left">
                            <input value={swapInputForm?.targetInputValue || 0} className="IndexPage-swap_input" onChange={onChangeTargetPriceInput} type="number"/>
                            <p className="IndexPage-swap_input_USD">{tokenCtx?.target?.price}</p>
                        </article>
                        <article className="IndexPage-swap_input_section_right">
                            <div className="IndexPage-swap_active_button" onClick={() => toggleActive("target")()}>
                                <WhiteEmpty width={20} height={20}/>
                                <p>{tokenCtx?.target?.name}</p>
                                <WhiteDownHalfArrow width={20} height={20}/>
                            </div>
                        </article>
                    </section>
                    <section className="IndexPage-swap_down_arrow">
                        <WhiteDownArrow width={20} height={20}/>
                    </section>
                    <section className="IndexPage-swap_input_section">
                        <article className="IndexPage-swap_input_section_left">
                            <input value={swapInputForm?.resultInputValue || 0} className="IndexPage-swap_input" onChange={onChangeResultInput} type="number"/>
                            <p className="IndexPage-swap_input_USD">{tokenCtx?.result?.price}</p>
                        </article>
                        <article className="IndexPage-swap_input_section_right">
                            <div className="IndexPage-swap_active_button" onClick={() => toggleActive("result")()}>
                                <WhiteEmpty width={20} height={20}/>
                                <p>{tokenCtx?.result?.name}</p>
                                <WhiteDownHalfArrow width={20} height={20}/>
                            </div>
                        </article>
                    </section>
                    <button className={`IndexPage-swap_button ${!swapInputForm.resultInputValue || !swapInputForm.targetInputValue ? "IndexPage-swap_button--disabled" : "IndexPage-swap_button--active"}`}>금액을 입력하세요.</button>
                </section>
            </main>
            <TokenDialog selectType={selectType} isActive={isActive} toggleActive={toggleActive(selectType)}/>
        </>
    )
}

const IndexPageWithTokenStore: FC = () => {
    return (
        <TokenStoreProvider>
            <IndexPage/>
        </TokenStoreProvider>
    )
}

export default IndexPageWithTokenStore