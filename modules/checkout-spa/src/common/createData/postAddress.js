import baseFetch from "../services/liferay/api";

export function postAddress(formData){

    console.log("formData from address form is "+JSON.stringify(formData));

    let postAddressUrl = `/o/headless-admin-user/v1.0/accounts/${formData.accountId}/postal-addresses`;

    const jsonData = {
        "addressCountry": "India",
        "addressLocality": formData.city,
        "addressRegion": "Delhi",
        "addressType": formData.type.toLowerCase(),
        "name": formData.firstName + formData.lastName,
        "phoneNumber": formData.phoneNumber,
        "postalCode": formData.zip,
        "primary": false,
        "streetAddressLine1": formData.address1,
        "streetAddressLine2": formData.address2,
        "streetAddressLine3": formData.address3
      }
    

      console.log("jsonData for address before being posted is "+JSON.stringify(jsonData));
     async function postData(){
       await baseFetch(postAddressUrl,{
            method: 'POST',
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