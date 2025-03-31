import React from "react";
import { CheckoutForm } from "./common/form/CheckoutForm";
import { findCommerceOrderCookie } from "./common/cookies/cookies";
import { getTranslation } from "./helper/Translation";
import { ItemDetails } from "./common/sections/ItemDetails/ItemDetails";

export function App() {

    const [orderPresent, setOrderPresent] = React.useState(true);
    const intervalRef = React.useRef(null);

    React.useEffect(() => {
        intervalRef.current = setInterval(() => {
            const orderUUID = findCommerceOrderCookie();
            if (orderUUID === null || orderUUID === undefined) {
                setOrderPresent(false); 
            }
        }, 2000);

        return () => clearInterval(intervalRef.current);
    }, []); 

    const handleSaveBtnEvent = () => {
        clearInterval(intervalRef.current);
    }

    if (orderPresent) {
        return (
            <div>
                <CheckoutForm onSaveSuccess = {handleSaveBtnEvent} />
                <ItemDetails />
            </div>
        );
    } else {
        return (
            <div>
                <h3>{getTranslation("NoOrderFoundHeading", 'en')}</h3>
                <h5>
                    <span>{getTranslation("NoOrderFoundBody", 'en')}</span>
                </h5>
            </div>
        );
    }
}
