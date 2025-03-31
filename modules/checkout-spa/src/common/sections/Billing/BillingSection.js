import React from "react";
import Header from "../../headers/Header";
import Constants from "../../constants/Constants";
import BounceLoader from "react-spinners/ClipLoader";
import { AddAddressBtn } from "../../buttons/AddAddressBtn";
import { AddAddress } from "../../form/AddAddress";
import { SelectTag } from "../../tags/SelectTag";

export function BillingSection({billingAddress, accountId, onBillingAddressChange}) {

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [addressType, setAddressType] = React.useState(null);

  const handleOnAddAddressBtnClick = () => {
    console.log('Add Address Button clicked');
    setIsModalOpen(true); // Open the modal
    setAddressType(Constants.BILLING);
  };

  const handleOnCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  if (billingAddress == null){
    return(
      <div>
        <BounceLoader />
      </div>
    )
  }

  if (billingAddress.items.length > 0){
    return(
      <div>
        <Header name={Constants.BILLING_ADDRESS_HEADING} />
        <SelectTag
          obj={billingAddress}
          type={Constants.BILLING}
          onChange={(event) => onBillingAddressChange(event.target.value)}
        /> 
        <AddAddressBtn onClick={handleOnAddAddressBtnClick}/>
        <AddAddress isOpen={isModalOpen} onClose={handleOnCloseModal} addressType={addressType} accountId={accountId}/>
      </div>
    )
  } else {
    return(
      <div>
        <Header name={Constants.BILLING_ADDRESS_HEADING} />
        <AddAddressBtn onClick={handleOnAddAddressBtnClick}/>
        <AddAddress isOpen={isModalOpen} onClose={handleOnCloseModal} addressType={addressType} accountId={accountId}/>
      </div>
    )
  }

}
