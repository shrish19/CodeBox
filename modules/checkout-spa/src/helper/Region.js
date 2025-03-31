import React from "react";
import baseFetch from "../common/services/liferay/api";

export function getRegion({countryId}){

    const [regions, setRegions] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {

        async function fetchData(){
            if (countryId){
            try {
                
                const regionReqCall = await baseFetch(`/o/headless-admin-address/v1.0/countries/${countryId}/regions`);

                if (!regionReqCall.ok){
                    throw new Error("Exception while fetching data");
                }

                const regionResCall = await regionReqCall.json();

                setRegions(regionResCall);

            } catch (error) {
                setError("Exception while fetching data");
            } finally{
                setLoading(false);
            }
        }
     else {
        setRegions([]);
        setLoading(false);
    }
};
        fetchData();
    }, [countryId]);

    return {regions};

}


