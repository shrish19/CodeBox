import React from "react";
import Header from "../../headers/Header";
import Constants from "../../constants/Constants";
import BounceLoader from "react-spinners/ClipLoader";
import { AddAddressBtn } from "../../buttons/AddAddressBtn";
import { AddAddress } from "../../form/AddAddress";
import { SelectTag } from "../../tags/SelectTag";

export function ShippingSection({shippingAddressObj, accountId, onShippingAddressChange}){

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const [addressType, setAddressType] = React.useState(null);
  
    const handleOnAddAddressBtnClick = () => {
      console.log('Add Address Button clicked');
      setIsModalOpen(true); // Open the modal
      setAddressType(Constants.SHIPPING);
    };
  
    const handleOnCloseModal = () => {
      setIsModalOpen(false); // Close the modal
    };
  

    if (shippingAddressObj == null){
        return(
          <div>
            <BounceLoader />
          </div>
        )
    }

    if (shippingAddressObj.items.length > 0){
        return(
          <div>
            <Header name={Constants.SHIPPING_ADDRESS_HEADING} />
            <SelectTag
                obj={shippingAddressObj}
                type={Constants.SHIPPING}
                onChange={(event) => onShippingAddressChange(event.target.value)}
            />             
            <AddAddressBtn onClick={handleOnAddAddressBtnClick}/>
            <AddAddress isOpen={isModalOpen} onClose={handleOnCloseModal} addressType={addressType} accountId={accountId}/>
          </div>
        )
      } else {
        return(
          <div>
            <Header name={Constants.SHIPPING_ADDRESS_HEADING} />
            <AddAddressBtn onClick={handleOnAddAddressBtnClick}/>
            <AddAddress isOpen={isModalOpen} onClose={handleOnCloseModal} addressType={addressType} accountId={accountId}/>
          </div>
        )
      }
    

}