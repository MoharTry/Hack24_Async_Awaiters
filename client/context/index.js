import React, { useEffect, useContext, createContext } from "react";

import {
  useAddress,
  useMetamask,
  useContractRead,
  useContractEvents,
  ChainId,
} from "@thirdweb-dev/react";

import { useContract } from "@thirdweb-dev/react";
import { useContractWrite } from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x1affbb90Ef26e3AB6117A411163A6fcEB57df90e"
  );

  console.log("Contract:", contract);

  const address = useAddress();
  const connect = useMetamask();

  const realEstate = "Real Estate Dapp";

  //FUNCTION -------

  //1.listProperty()
  const {
    mutateAsync: listProperty,
    isLoading,
    error,
  } = useContractWrite(contract, "listProperty");

  const createPropertyFunction = async (form) => {
    const {
      propertyTitle,
      description,
      category,
      price,
      images,
      propertyAddress,
    } = form;
    try {
      const data = await listProperty({
        args: [
          address,
          propertyTitle,
          description,
          category,
          price,
          images,
          propertyAddress,
        ],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };
  return (
    <StateContext.Provider
      value={{ address, connect, contract, realEstate, createPropertyFunction }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
