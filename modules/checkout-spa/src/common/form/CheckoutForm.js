import React from "react";
import { BillingSection } from "../sections/Billing/BillingSection";
import { ShippingSection } from "../sections/Shipping/ShippingSection";
import { fetchBillingAddresses } from "../../helper/Billing";
import { fetchShippingAddresses } from "../../helper/Shipping";
import fetchCommerceAccount from "../../helper/CommerceAccount";
import '../styles/formcontainer.css';
import { getTranslation } from "../../helper/Translation";
import { callOrderPlacedApi } from "../createData/callOrderPlacedApi";
import ClayAlert from '@clayui/alert';

export function CheckoutForm({onSaveSuccess}){

    const {billingAddress} = fetchBillingAddresses();

    const {shippingAddress} = fetchShippingAddresses();

    const {account} = fetchCommerceAccount();

    const [selectedBillingAddress, setSelectedBillingAddress] = React.useState(null);
    const [selectedShippingAddress, setSelectedShippingAddress] = React.useState(null);

    const [isLoading, setIsLoading] = React.useState(null);
  
    const handleBillingAddressChange = (value) => {
        setSelectedBillingAddress(value);
        console.log(`Selected Billing Address ID: ${value}`);
    };
  
    const handleShippingAddressChange = (value) => {
      setSelectedShippingAddress(value);
      console.log(`Selected Shipping Address ID: ${value}`);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (selectedBillingAddress !== null && selectedShippingAddress !== null){
            try {
                setIsLoading(true);

                console.log('Selected Billing Address ID:'+ selectedBillingAddress);
                console.log('Selected Shipping Address ID:'+ selectedShippingAddress);
                callOrderPlacedApi(selectedBillingAddress, selectedShippingAddress, account.id, account.name);
                
            } catch (error) {
                console.error("Exception while calling checkout api ",error);
            } finally{
                setIsLoading(false);
                onSaveSuccess();
                document.getElementById("confirmorderformid").style.display="none";
                document.getElementById("thankyousectionid").style.display="block";
            }

        } else{
            document.getElementById("warningMsg").classList.remove("hide");
        }
    
     };

    const isDataLoaded = billingAddress && shippingAddress && account;

    return (
        <div>

            {/*
                Warning UI when proceeding without both addresses.
            */}
            <div id="warningMsg" class="hide">
                <ClayAlert displayType="warning" title="Warning" role={null}>
                    Billing and Shipping Address are mandatory.
                </ClayAlert>
            </div>

            <form className="form-container" id="confirmorderformid" style={{display:'block'}}>
                {isDataLoaded && (
                    <>
                        <BillingSection billingAddress={billingAddress} accountId={account.id} onBillingAddressChange={handleBillingAddressChange} />
                        
                        <br />

                        <ShippingSection shippingAddressObj={shippingAddress} accountId={account.id} onShippingAddressChange={handleShippingAddressChange}/>

                        <br />

                        <button type="submit" id="checkoutconfirmorderbtn" onClick={(e) => handleSubmit(e)}>{getTranslation('ConfirmOrder','en')}</button>
                    </>
                    )}
            </form>
            <div>
                {isLoading ? (
                            <BounceLoader />
                        ) : (
                            <div id="thankyousectionid" style={{display:'none'}}>
                                <h5>
                                    {getTranslation("ThankYou",'en')}
                                </h5>
                                <a href={window.location.origin}>{getTranslation("GoToHome", 'en')}</a>
                            </div>
                        )}
            </div>
        </div>
    );
}