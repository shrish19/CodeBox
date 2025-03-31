import { patchUpdatedAccountData } from "../../helper/CommerceAccount";
import { patchCommerceOrder } from "../../helper/Order";
import { getTranslation } from "../../helper/Translation";
import BounceLoader from "react-spinners/ClipLoader";


export function callOrderPlacedApi(billingAddressId, shippingAddressId, accountId, accountName){

    patchUpdatedAccountData(accountId, accountName, billingAddressId, shippingAddressId);

    patchCommerceOrder(billingAddressId, shippingAddressId);

}