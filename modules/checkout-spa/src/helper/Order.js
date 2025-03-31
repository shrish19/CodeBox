import React from "react";
import { eraseCookie, findCommerceOrderCookie } from "../common/cookies/cookies";
import baseFetch from "../common/services/liferay/api";
import Constants from "../common/constants/Constants";

export function fetchOrderByCookie(){

    const [cart, setCart] = React.useState(null);

        const orderUUID = findCommerceOrderCookie();
        console.log("ORDER UUID is "+orderUUID);
        
        React.useEffect(()=> {
        
            async function fetchData(){
                try{

                    const orderObjReqCall = await baseFetch(`/o/headless-commerce-admin-order/v1.0/orders/by-externalReferenceCode/${orderUUID}`);
                    const orderObjResCall = await orderObjReqCall.json();

                    if (orderObjResCall === null){
                        throw new Error("Exception while fetching order data");
                    }

                    const cartReqCall = await baseFetch(`/o/headless-commerce-delivery-cart/v1.0/carts/${orderObjResCall.id}`);
                    const cartResCall = await cartReqCall.json();

                    setCart(cartResCall);

                    console.log("Cart Response is "+cart);
                }catch(err){
                    throw new Error("Exception while fetching the data");
                }
            }

            fetchData();
        
        }, []);

    return {cart};
}


export function patchCommerceOrder(billingAddressId, shippingAddressId){

    console.log("Inside patchCommerceOrder");

    const orderUUID = findCommerceOrderCookie();

    console.log("commerce order uuid is "+orderUUID);

    const jsonData = {
        "billingAddressId" : billingAddressId,
        "shippingAddressId" : shippingAddressId
    };

        async function patchData(){
            await baseFetch(`/o/headless-commerce-admin-order/v1.0/orders/by-externalReferenceCode/${orderUUID}`
            ).then((orderObjData)=>{
                console.log("orderObjData is "+JSON.stringify(orderObjData));
                if (!orderObjData.ok){
                    throw new Error("Exception while fetching commerce order object");
                }
                return orderObjData.json();
            }).then(async (data) =>{
                await baseFetch(`/o/headless-commerce-delivery-cart/v1.0/carts/${data.id}`, {
                    method : 'PATCH',
                    body : JSON.stringify(jsonData)
                }).then((res) => {
                    console.log("res is "+JSON.stringify(res))
                    if (!res.ok){
                        throw new Error("Exception while updating commerce order");
                    }
                    return res.json();
                }).then(async (data) => {
                    console.log("updated commerce address");
    
                    await baseFetch(`/o/headless-commerce-delivery-cart/v1.0/carts/${data.id}/checkout`, {
                        method : 'POST'
                    }).then(res => {
                        if (!res.ok){
                            throw new Error("Exception while calling checkout api");
                        }
                        return res.json();
                    }).then((data) => {
                        console.log(data);
    
                    });
    
                })
            })
        }


    patchData();
    
    eraseCookie(Constants.COMMERCE_ORDER_COOKIE);
}