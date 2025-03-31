import React from "react";
import BounceLoader from "react-spinners/ClipLoader";
import Constants from "../constants/Constants";
import { getTranslation } from "../../helper/Translation";


export function SelectTag({obj,type,onChange}){
    console.log("Obj is "+JSON.stringify(obj));

    let typeOfAddress;
    if (type === "Shipping"){

        typeOfAddress = Constants.SHIPPING.toLowerCase();
    } else {

        typeOfAddress = Constants.BILLING.toLowerCase();
    }


    
    if (obj == null){
        return (
            <div>
                <BounceLoader />
            </div>
        )
    }
    else {
        obj.items.forEach(item => {
            console.log(`Item ID: ${item.id}, AddressType: ${item.addressType}`);
        });
    return(
        <div>
            <select id={typeOfAddress}  onChange={onChange}>
                <option key="" value="" required>
                    {getTranslation("SelectAddress", 'en')}
                </option>
            {obj.items
                .filter(item => item.addressType === typeOfAddress)
                .map(item => (
                    <option 
                    key={item.id}
                    value={item.id}
                    >
                    {item.name}
                    </option>
                ))
            }
            </select>
        </div>
    )
    }
}