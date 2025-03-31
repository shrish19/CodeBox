import React from "react";
import {  fetchOrderByCookie } from "./Order";
import baseFetch from "../common/services/liferay/api";
import Constants from "../common/constants/Constants";

export function fetchShippingAddresses(){

    const {cart} = fetchOrderByCookie();

    const [shippingAddress, setShippingAddress] = React.useState();
    const [accountId, setAccountId] = React.useState();

        React.useEffect(() => {
            async function fetchData () {
                try{
                    const shippingAddressReqCall = await baseFetch(`/o/headless-admin-user/v1.0/accounts/${cart.accountId}/postal-addresses`);

                    if (!shippingAddressReqCall.ok){
                        throw new Error("Exception while fetching data from Api");
                    }

                    const shippingAddressResCall = await shippingAddressReqCall.json();

                  // Filter the items to only include those with addressType "shipping"
                  const filteredShippingAddresses = shippingAddressResCall.items.filter(
                    item => item.addressType === Constants.SHIPPING.toLowerCase()
                );

                // Create a new object with the filtered items
                const filteredShippingAddressObj = {
                    ...shippingAddressResCall, // Copy other properties from the original object if needed
                    items: filteredShippingAddresses // Assign the filtered array to the items property
                };

                setShippingAddress(filteredShippingAddressObj);

                setAccountId(cart.accountId);
                
                }catch(err){
                    console.error("Exception while fetching data from Billing Address api ")
                }
            }
            fetchData();
        }, [cart]);


    return {shippingAddress, accountId};

}