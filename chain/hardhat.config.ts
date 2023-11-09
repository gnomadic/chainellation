import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";
const fs = require("fs");

require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
// require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
// require("hardhat-api-builder");
require("hardhat-deploy");
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-api-builder");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [`0x${process.env.GOERLI_PRIVATE_KEY}`],
    },
    polygon: {
      url: process.env.POLYGON_URL,
      accounts: [`0x${process.env.POLYGON_PRIVATE_KEY}`],
    },
    sep: {
      url: process.env.SEP_URL,
      accounts: [`0x${process.env.SEP_PRIVATE_KEY}`],
    },
    eth: {
      url: process.env.ETHEREUM_URL,
      accounts: [`0x${process.env.ETHEREUM_PRIVATE_KEY}`],
    },
    base: {
      url: process.env.BASE_URL,
      accounts: [`0x${process.env.BASE_PRIVATE_KEY}`],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },

  // etherscan: {
  //   apiKey: {
  //     mainnet: process.env.ETHERSCAN_API_KEY,
  //     polygon: process.env.POLYGON_SCAN_API_KEY || "",
  //     goerli: process.env.GEORLI_SCAN_KEY || "",
  //     base: process.env.BASE_SCAN_KEY || "",
  //   },
  // },

  // verify: {
  //   etherscan: {
  //     apiUrl: "https://api-goerli.basescan.org",
  //     apiKey: process.env.ETHERSCAN_API_KEY ?? "ETHERSCAN_API_KEY",
  //   },
  // },

  etherscan: {
    apiKey: {
      base: process.env.BASE_SCAN_KEY ?? "BASE_SCAN_KEY",
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/",
          browserURL: "https://basescan.org/",
        },
      },
    ],
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
