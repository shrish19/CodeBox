import React from "react";
import baseFetch from "../common/services/liferay/api";

export function getCountryListings(){

    const [country, setCountry] = React.useState(null);


    React.useEffect(() => {

        async function fetchData(){
            try {

                const countryReqCall = await baseFetch(`/o/headless-admin-address/v1.0/countries`);

                if (!countryReqCall.ok){
                    throw new Error("Exception while fetching data");
                }

                const countryResCall = await countryReqCall.json();

                if (Array.isArray(countryResCall)) {
                    // This is safe to iterate over
                    setCountry(countryResCall.items);
                } else {
                    // Handle case where the response is not iterable
                    console.log("Response is not an array: ", countryResCall);
                }

                
                
            } catch (error) {
                console.error("Exception while fetching data");
            }
        }
        fetchData();
    }, []);

    console.log("Country obj is "+country);

    return {country};

}

export function getCountryByName(name){
console.log("name sent is :: "+name);
    const [country, setCountry] = React.useState(null);


    React.useEffect(() => {

        async function fetchData(){
            try {

                const countryReqCall = await baseFetch(`/o/headless-admin-address/v1.0/countries/by-name/${name}`);

                if (!countryReqCall.ok){
                    throw new Error("Exception while fetching data");
                }

                const countryResCall = await countryReqCall.json();
                setCountry(countryResCall.items)
                
            } catch (error) {
                console.error("Exception while fetching data");
            }
        }
        fetchData();
    }, []);

    console.log("Country obj is "+country);

    return {country};

}