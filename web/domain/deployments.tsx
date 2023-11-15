import { Address, Deployment } from "./Domain";
import { Decoration } from "./Domain";

export const Deployments: { [key: string]: Deployment } = {
  ethereum: {
    chainellationAddress: "0x9De065d2c8D68b7395eBE85A14377FD86a92E454",
    decoAddress: "0x0",
    displayName: "ethellation",
    currency: "eth",
    chain: "ethereum",
  },
  polygon: {
    chainellationAddress: "0xbcE1b660Ee52F5b378b7A8f0e01A3dd4EC5c590A",
    decoAddress: "0xf7dC791b5219e134B28E4ce10A55E61b6f44b33b",
    displayName: "polyellation",
    currency: "matic",
    chain: "polygon",
  },
  // optimism: {
  //   address: "0xc484794314F2Ba4e98357343F2342B47d645c6Ed",
  //   contractInterface: ChainellationABI,
  //   displayName: "opellation",
  //   currency: "eth",
  // },
  sepolia: {
    chainellationAddress: "0x414646540621CC43fB3CF7863D31A36e5D6D884b",
    decoAddress: "0xC5fb7C3232b88782d0c2a8D19A9dcF8b4c170239",
    displayName: "sepollation",
    currency: "eth",
    chain: "sepolia",
  },

  chainellation: {
    chainellationAddress: "0x0",
    decoAddress: "0x0",
    displayName: "chainellation",
    currency: "eth",
    chain: "none",
  },
};

export const FreeDecorations: { [key: string]: Address[] } = {
  sepolia: [
    // name: "empty_silhouette",
    "0x62c45044f0201eC7Ef3b75d77e36C87D0EE0bdd0",
    // name: "empty_skymath",
    "0xdA4a2bC3Fe9987F5F529BeB33Acd6DC1ccF3B9DF",
    // name: "empty_deco",
    "0xd773776e7e338b56EEa2f6FFE5161085249Dd774",

    // name: "mountainLine",
    "0x3169Bc40FB73A9EA1574f34CeCdDf4e51Da6027d",
    // name: "skyCircle",
    "0xA9657A1514345A24CE3535C7EbA39E8001EBA1ED",
  ],
};
