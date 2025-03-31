import React from "react";
import baseFetch from "../common/services/liferay/api";
import NoChannelExist from "../error/NoChannelExist";
import {  fetchOrderByCookie } from "./Order";
import Constants from "../common/constants/Constants";

export function fetchBillingAddresses () {

    const {cart} = fetchOrderByCookie();

    const [billingAddress, setBillingAddress] = React.useState();
    const [accountId, setAccountId] = React.useState();

        React.useEffect(() => {
            async function fetchData () {
                try{
                    const billingAddressReqCall = await baseFetch(`/o/headless-admin-user/v1.0/accounts/${cart.accountId}/postal-addresses`);

                    if (!billingAddressReqCall.ok){
                        throw new Error("Exception while fetching data from Api");
                    }

                    const billingAddressResCall = await billingAddressReqCall.json();

                   // Filter the items to only include those with addressType "billing"
                    const filteredBillingAddresses = billingAddressResCall.items.filter(
                        item => item.addressType === Constants.BILLING.toLowerCase()
                    );

                    // Create a new object with the filtered items
                    const filteredBillingAddressObj = {
                        ...billingAddressResCall, // Copy other properties from the original object if needed
                        items: filteredBillingAddresses // Assign the filtered array to the items property
                    };

                    setBillingAddress(filteredBillingAddressObj);

                    setAccountId(cart.accountId);
                }catch(err){
                    console.error("Exception while fetching data from Billing Address api ")
                }
            }
            fetchData();
        }, [cart]);


    return {billingAddress, accountId};

}