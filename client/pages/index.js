import React, { useState, useEffect } from 'react'

import { ethers } from "ethers";

//INTERNAL IMPORT
import {useStateContext } from "../context";

const index = () => {
    const { address, connect, contract, realEstate } = useStateContext();
  return (
    <div>
          <h1>{realEstate}</h1>
          <button onClick={() => connect()}>Connect</button>
          <p>{address}</p>
    </div>
  )
}

export default index;
