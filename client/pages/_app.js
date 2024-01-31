import "../app/globals.css";
import { ChainId } from "@thirdweb-dev/sdk";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "@/context";

//INTERNAL IMPORT

const App = ({ Component, pageProps }) => {
  return (
    <ThirdwebProvider activeChain={ChainId.Mumbai}>
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    </ThirdwebProvider>
  ) 
};

export default App;