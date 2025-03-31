import React from "react";
import { Liferay } from "../common/services/liferay/liferay";


const GeneralError = () => {

    function goToHomePage(){
        window.location.href=`${window.location.origin}`
    }

    return(
        <div>
            <h3>${Liferay.Language.get("general-error")}</h3>
            <div>
                <button onClick={goToHomePage}>${Liferay.Language.get("go-to-homepage")}</button>
            </div>
        </div>
    )
}

export default GeneralError;