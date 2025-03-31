import React from "react";
import { fetchOrderByCookie } from "./Order";
import { findCommerceOrderCookie } from "../common/cookies/cookies";
import baseFetch from "../common/services/liferay/api";

export function CartItem(){

    const [orderPresent, setOrderPresent] = React.useState(true); 
    React.useEffect(() => {
        const interval = setInterval(() => {
            const orderUUID = findCommerceOrderCookie();
            if (orderUUID === null || orderUUID === undefined) {
                console.log("No order UUID found in cookie");
                setOrderPresent(false); 
            }
            console.log("Order UUID is present");
        }, 2000);

        return () => clearInterval(interval);
    }, []); 


    const [cartItems, setCartItems] = React.useState(null);

    const {cart} = fetchOrderByCookie();
        
        React.useEffect(() => {
            async function fetchData () {
                try{
                    const cartItemReqCall = await baseFetch(`/o/headless-commerce-delivery-cart/v1.0/carts/${cart.id}/items`);

                    if (!cartItemReqCall.ok){  
                        throw new Error("Exception while fetching data from Cart Item Api");
                    }

                    const cartItemResCall = await cartItemReqCall.json();

                    setCartItems(cartItemResCall);
                }catch(err){
                    console.error("Exception while fetching data from Cart Item api "+err);
                }
            }
            fetchData();
        }, [cart])

    console.log("Cart Item obj is "+cartItems);

    return {cartItems};

}