import React from "react";
import { CartItem } from "../../../helper/CartItem";
import { getTranslation } from "../../../helper/Translation";
import BounceLoader from "react-spinners/ClipLoader";
import { fetchOrderByCookie } from "../../../helper/Order";
import '../../styles/tablecontainer.css';


export function ItemDetails(){

    const {cartItems} = CartItem();

    const {cart} = fetchOrderByCookie();

    if (!cartItems || cartItems == null || cart == null){
        return (
            <div>
                <BounceLoader />
            </div>
        )
    }
    
    if (cartItems !== null){
        return (
            
            <div class="">
                <table className = "table-border">
                    <thead>
                        <tr>
                            <th>{getTranslation("ItemName", "end")}</th>
                            <th>{getTranslation("ItemCode", "en")}</th>
                            <th>{getTranslation("Quantity", "en")}</th>
                            <th>{getTranslation("UnitPrice", "en")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.items.map((item) =>(
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.sku}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="price-detail">
                    <span><p>{getTranslation("SubTotal","en")} : {cart.summary.subTotalFormatted}</p></span>
                    <span><p>{getTranslation("Tax","en")} : {cart.summary.taxValue}</p></span>
                    <span><p>{getTranslation("OrderTotal", "en")} : {cart.summary.totalFormatted}</p></span>
                </div>
			</div>
        )
    }

}