import React from "react";
import ClayButton from '@clayui/button';
import { getTranslation } from "../../helper/Translation";

export function AddAddressBtn({onClick}){

    return(
        <div>
            <ClayButton.Group spaced>
                <ClayButton displayType="primary" onClick={onClick}>
                    {getTranslation("AddNewAddress", 'en')}
                </ClayButton>
            </ClayButton.Group>
        </div>
    )

}