import React from "react";
import Header from "../headers/Header";
import BounceLoader from "react-spinners/ClipLoader";
import { postAddress } from "../createData/postAddress";
import { getTranslation } from "../../helper/Translation";


export function AddAddress({ isOpen, onClose, addressType, accountId }) {

    const [formData, setFormData] = React.useState({
        accountId:'',
        type:'',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address1: '',
        address2: '',
        address3: '',
        city: '',
        zip: '',
      });

      // Handle input change
      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          type: addressType,
          accountId: accountId,
          [id]: value,
        }));
      };

      // Handle form submission
  const submitAddressForm = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('Form Data:', formData); 
    document.getElementById("formmodalid").style.display="none";
    document.getElementById("bounceLoaderId").classList.remove("hide");
    postAddress(formData);
    setTimeout(()=>{
        location.reload();
    },2000);
  };

    return (
        <div>
            <div
                className={`modal fade ${isOpen ? 'show' : ''}`}
                id="staticBackdrop2"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel2"
                aria-hidden={!isOpen}
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                <div className="modal-dialog d-flex justify-content-center">
                    <div className="modal-content w-75">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel2">
                                <Header name={"Add Address"} />
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div id="formmodalid" className="modal-body p-4">
                            <form style={{display:'block'}}>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="hidden" id="type" className="form-control" value={formData.type} disabled />
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="hidden" id="accountId" className="form-control" value={formData.accountId} disabled />
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input required type="text" id="firstName" className="form-control" value={formData.firstName} onChange={handleChange} />
                                    <label className="form-label" htmlFor="firstName">{getTranslation("FirstName", 'en')}</label>
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input required type="text" id="lastName" className="form-control" value={formData.lastName} onChange={handleChange} />
                                    <label className="form-label" htmlFor="lastName">{getTranslation('LastName', 'en')}</label>
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input required type="text" id="phoneNumber" className="form-control" value={formData.phoneNumber} onChange={handleChange} />
                                    <label className="form-label" htmlFor="phoneNumber">{getTranslation('PhoneNumber', 'en')}</label>
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input required type="text" id="address1" className="form-control" value={formData.address1} onChange={handleChange} />
                                    <label className="form-label" htmlFor="address1">{getTranslation('Address1', 'en')}</label>
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="text" id="address2" className="form-control" value={formData.address2} onChange={handleChange} />
                                    <label className="form-label" htmlFor="address2">{getTranslation('Address2', 'en')}</label>
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="text" id="address3" className="form-control" value={formData.address3} onChange={handleChange} />
                                    <label className="form-label" htmlFor="address3">{getTranslation('Address3', 'en')}</label>
                                </div>

                                {/* <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="hidden" id="countryId" className="form-control" value={country.id} disabled />
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="text" id="countryName" className="form-control" value={country.name} disabled />
                                    <label className="form-label" htmlFor="countryName">Country</label>
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="text" id="region" className="form-control" value={formData.region} disabled />
                                    <label className="form-label" htmlFor="region">Region</label>
                                </div> */}

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="text" id="city" className="form-control" value={formData.city} onChange={handleChange} />
                                    <label className="form-label" htmlFor="city">{getTranslation('City', 'en')}</label>
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="text" id="zip" className="form-control" value={formData.zip} onChange={handleChange} />
                                    <label className="form-label" htmlFor="zip">{getTranslation('PostalCode', 'en')}</label>
                                </div>

                                <button type="submit" onClick={submitAddressForm}>{getTranslation('Submit', 'en')}</button>
                            </form>
                        </div>
                        <div id="bounceLoaderId" class="hide">
                            <BounceLoader />
                        </div>  
                    </div>
                </div>
            </div>                 

        </div>
    )

}