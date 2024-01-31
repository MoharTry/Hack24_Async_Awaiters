require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = "fc9b6d5774b80d403bb15c720e3a894f1d2e83b82d43a5197f7fc9b876c761be";

const RPC_URL  = "https://rpc.ankr.com/polygon_mumbai"

module.exports = {

  deafultNetwork: "polygon-mumbai",
  networks: {
    hardhat: {
      chainId: 80001,
    },
    polygon_mumbai: {
      url: RPC_URL ,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },

  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    zksync_testnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "goerli",
      chainId: 280,
      zksync: true,
    },
    zksync_mainnet: {
      url: "https://zksync2-mainnet.zksync.io/",
      ethNetwork: "mainnet",
      chainId: 324,
      zksync: true,
    },
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
