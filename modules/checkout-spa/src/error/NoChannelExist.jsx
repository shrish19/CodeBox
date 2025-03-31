import React from "react";
import Header from "../common/headers/Header";
import Constants from "../common/constants/Constants";

const NoChannelExist = () => {
    return(
        <div>
            <Header name={Constants.NO_CHANNEL_EXISTS} />
            <h5><span>Please Create A Channel To Proceed</span></h5>
        </div>
    )
}

export default NoChannelExist;