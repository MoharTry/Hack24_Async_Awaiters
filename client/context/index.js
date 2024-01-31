import React, { useEffect, useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
  useContractEvents,
} from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x1affbb90Ef26e3AB6117A411163A6fcEB57df90e"
  );

  const address = useAddress();
  const connect = useMetamask();

  const realEstate = "Real Estate Dapp";

  //FUNCTION-----

  //1. listProperty()

  const {
    mutateAsync: listProperty,
    isLoading,
    error,
  } = useContractWrite(contract, "listProperty");

  const createPropertyFunction = async () => {
    try {
      const data = await listProperty({
          [
              address,
              price,
              _propertyTitle,
              _category,
              _images,
              _propertyAddress,
            _description,
          ],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
    };
    return (
        <StateContextProvider value={{ address, connect, contract, realEstate, createPropertyFunction }}>
            {children}
        </StateContextProvider>
    );
};

export const useStateContext = () => useContext(StateContext);
