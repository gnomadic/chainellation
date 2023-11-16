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
    chainellationAddress: "0x45d45517f1000f188A94b67B74650CD1Dc9190Ad",
    decoAddress: "0xF132dbB1d18379c0fBb8885bD288afCa120A076a",
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
    "0x0f86eEa13791f97A370BD780e0e73754D03f152C",
    // name: "empty_skymath",
    "0x8F9c2a33E45aD479a997D31284d62ce5D43d663A",
    // name: "empty_deco",
    "0x570CF798A9944dE5fDC932A4de7A0579AfC06cBb",

    // name: "mountainLine",
    "0xF547F45154E398a3ADdD83a73ff4EDAA87f46bb0",
    // name: "skyCircle",
    "0x4EaD2064aB2C3FAA237818708948FD498Aeed7f2",
  ],
};
