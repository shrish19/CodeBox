import React from "react";
import baseFetch from "../common/services/liferay/api";
import Constants from "../common/constants/Constants";

export function fetchChannelObjByListTypeEntry() {
    const [channelId, setChannelId] = React.useState(null);


    React.useEffect(() => {
     
        async function fetchData() {
            try {
                
                const listTypeDefReqCall = await baseFetch(`/o/headless-admin-list-type/v1.0/list-type-definitions/by-external-reference-code/${Constants.PICKLIST_DEF_ERC}`);
                const listTypeDefResCall = await listTypeDefReqCall.json();

                console.log("Channel Picklist value "+listTypeDefResCall)
                const listTypeEntryReqCall = await baseFetch(`/o/headless-admin-list-type/v1.0/list-type-definitions/${listTypeDefResCall.id}/list-type-entries`);
                const listTypeEntryResCall = await listTypeEntryReqCall.json();

                const channelReqCall = await baseFetch(`/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${listTypeEntryResCall.items[0].externalReferenceCode}`);
                const channelResCall = await channelReqCall.json();
                console.log("Channel obj received is "+channelResCall);
                setChannelId(channelResCall);
                
                

            } catch (err) {
                throw new Error("Exception while calling fetching");
            }
        }
    
        fetchData();
    
    }, []);
    console.log(channelId);
    return { channelId };
}