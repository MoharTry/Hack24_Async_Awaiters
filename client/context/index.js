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
      console.info("contract call success", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  //2.updateProperty()
  const { mutateAsync: updateProperty, isLoading: updatePropertyLoading } =
    useContractWrite(contract, "updateProperty");

  const updatePropertyFunction = async (form) => {
    const {
      productId,
      propertyTitle,
      description,
      category,
      images,
      propertyAddress,
    } = from;
    try {
      const data = await updateProperty({
        args: [
          address,
          productId,
          propertyTitle,
          category,
          images,
          propertyAddress,
          desciption,
        ],
      });

      connect.log("Contract call successfully updated");
    } catch (error) {
      console.log("error while updating", error);
    }
  };

  //3.updatePrice()

  const { mutateAsync: updatePrice, isLoading: updatePriceLoading } =
    useContractWrite(contract, "updatePrice");

  const updatePriceFunction = async (form) => {
    const { productId, price } = form;

    try {
      const data = await updatePrice();

      console.log("Transaction successful", data);
    } catch (error) {
      console.log("Transaction failed", error);
    }
  };

  //4.buyProperty()
  const { mutateAsync: buyProperty, isLoading: buyPropertyLoading } =
    useContractWrite(contract, "buyProperty");

  const buyPropertyFunction = async (from) => {
    const { id } = from;
    try {
      const data = await buyProperty({ args: [id, address] });
      console.log("Successfully brought", data);
    } catch (error) {
      console.log("Buyiing Failed", error);
    }
  };

  //5.addReview()
  const { mutateAsync: addReview, isLoading: addReviewLoading } =
    useContractWrite(contract, "addReview");

  const addReviewFunction = async (form) => {
    const { productId, rating, comment } = from;
    try {
      const data = await addReview({
        args: [productId, rating, comment, address],
      });
      console.log("Successfully added Review", data);
    } catch (error) {
      console.log("Failure in addinf review", error);
    }
  };

  //6.LikeReview()
  const { mutateAsync: likeReview, isLoading: likeReviewLoading } =
    useContractWrite(contract, "likeReview");

  const likeReviewFunction = async (from) => {
    const { productId, reviewIndex } = from;

    try {
      const data = await likeReview({
        args: [productId, reviewIndex, address],
      });
      console.log("Successfully liked the comment", data);
    } catch (error) {
      console.log("Failure in liking comment", error);
    }
  };

  //GET PROPERTITES DATA SECTION
  //7.getAllProperties()
  const getPropertiesData = async () => {
    try {
      const properties = await contract.call("getAllProperties");
      const parsedProperties = properties.map((property, i) => ({
        owner: property.owner,
        title: property.propertyTitle,
        description: property.description,
        category: property.category,
        price: ethers.utils.formatEther(property.price.toString()),
        productId: property.productID.toNumber(),
        reviewers: property.reviewers,
        reviews: property.reviews,
        image: property.images,
        address: property.propertyAddress,
      }));
      console.log(properties);
    } catch (error) {
      console.log("Error while loading data", err);
    }
  };

  //8.getHighestratedProduct
  const {
    data: getHighestratedProduct,
    isloading: getHighestratedProductLoading,
  } = useContractRead(contract, "getHighestratedProduct");

  //9.getProductReviews()
  const getProductReviewsFunction = (productId) => {
    try {
      const { data: getProductReviews, isLoading: getProductReviewsLoading } = useContractRead(contract, "getProductReviews");
    } catch (error) {
      console.log("failed to get property reviews", error);
    }
  };

  //10.getProperty()
  const getPropertyFunction = (id) => {
    try {
      const { data: getProperty, isLoading: getPropertyLoading } = useContractRead("getProperty", [id]);
      return getProperty, getPropertyLoading;
    } catch (error) {
      console.log("error while fetching single property", error)
    }
  };

  //11.getUserProperties()
  const getUserPropertiesFunction = () => {
    try {
      const { data: getUserProperties, isLoading: getUserPropertiesLoading } = useContractRead("getUserProperties", [address]);

      return getUserProperties, getUserPropertiesLoading;
    } catch (error) {
      console.log("error while getting user property", error);
    }
  };

  //12.getUserReviews()
  const getUserReviewsFunction = () => {
    try {
      const { data: getUserReviews, isLoading: getUserReviewsLoading } = useContractRead("getUserReviews", [address]);
      return getUserReviews, getUserReviewsLoading
    } catch (error) {
      console.log("error", error);
    }
  };

  //13.totalProperty()
  const totalPropertyFunction = () => {
    try {
      const { data: totalProperty, isLoading: totalPropertyLoading } = useCOntractRead(contract, "propertyIndex");

      return totalProperty, totalPropertyLoading
    } catch (error) {
      console.log(error);
    }
  };

  //14.totalreviews

  const totalReviewsFunction = () => {
    try { 
      const { data: totalReviewsCount, isLoading: totalReviewCountLoading } = useContractWrite(contract, "reviewsCounter");
      return totalReviewsCount,totalReviewCountLoading
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        realEstate,
        createPropertyFunction,
        updatePropertyFunction,
        updatePriceFunction,
        buyPropertyFunction,
        addReviewFunction,
        likeReviewFunction,
        //READ PROPERTY DATA
        getPropertiesData,
        getHighestratedProduct,
        getProductReviewsFunction,
        getPropertyFunction,
        getUserPropertiesFunction,
        getUserReviewsFunction,
        totalPropertyFunction,
        totalReviewsFunction
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
