import React, {useEffect, useContext, createContext} from 'react'

import { useAddress, useContract, useMetamask, useContractWrite, useContractRead, useContractEvents } from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();


export const StateContextProvider = ({ children }) => {

    const { contract } = useContract("0x1affbb90Ef26e3AB6117A411163A6fcEB57df90e");
    

    const address = useAddress();
    const connect = useMetamask();

    const realEstate = "Real Estate Dapp";

    //FUNCTION-----

    //1. listProperty()

    const { mutateAsync: listProperty, isLoading, error } = useContractWrite(contract, "listProperty");

    const call = async () => {
        try {
            const data = await listProperty({
                args: [
                    owner,
                    price,
                    _propertyTitle,
                    _category,
                    _images,
                    _pr
                ]
            })
        }
    }

    return (
        <StateContext.Provider value={{ address, connect, contract, realEstate }}>
            {children}
        </StateContext.Provider>
    );
};


export const useStateContext = () => useContext(StateContext);


