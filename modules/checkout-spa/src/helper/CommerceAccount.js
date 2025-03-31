import React from "react";
import baseFetch from "../common/services/liferay/api";
import {  fetchOrderByCookie } from "./Order";


export default function fetchCommerceAccount(){

    const [account, setAccount] = React.useState('');

    const {cart} = fetchOrderByCookie();

    React.useEffect(() => {

        async function fetchData(){
            try {
                
                const commerceAccountReqCall = await baseFetch(`/o/headless-admin-user/v1.0/accounts/${cart.accountId}`);

                if (!commerceAccountReqCall.ok){
                    throw new Error("Exception while fetching data");
                }

                const commerceAccountResCall = await commerceAccountReqCall.json();

                setAccount(commerceAccountResCall);

            } catch (error) {

                console.error("Exception while fetching data");

            }
        }
        fetchData();
    }, [cart]);

    return {account};

}

export function patchUpdatedAccountData(accountId, accountName, billingAddressId, shippingAddressId){

    console.log("inside patchUpdatedAccountData");

    const postAddressUrl = `/o/headless-admin-user/v1.0/accounts/${accountId}`;

    const jsonData = {
        "defaultBillingAddressId" : billingAddressId,
        "defaultShippingAddressId" : shippingAddressId,
        "name":`${accountName}`
    };

    async function postData(){
        await baseFetch(postAddressUrl,{
             method: 'PATCH',
             body: JSON.stringify(jsonData)
         }).then((res)=>{
             if (!res.ok){
                 throw new Error("Exception while posting address");
             }
             return res.json();
         }).then((data) => {
             console.log(data);
         });
     }

     postData();

}