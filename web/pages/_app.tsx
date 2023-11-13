import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import {
  configureChains,
  // createClient,
  createConfig,
  useAccount,
  useNetwork,
  WagmiConfig,
} from "wagmi";
import {
  arbitrum,
  base,
  goerli,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Analytics } from "@vercel/analytics/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Address, Deployment } from "../domain/Domain";
import { Deployments } from "../domain/deployments";
import { createPublicClient, http } from "viem";

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [
//     // mainnet,
//     // polygon,
//     // optimism,
//     // arbitrum,
//     // goerli,
//     sepolia,
//     // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
//   ],
//   [publicProvider()]
// );

const { chains, publicClient } = configureChains(
  [
    sepolia,
    // base
  ],
  [publicProvider()]
  // [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "721890c665370dab6a3af12a2b0c7ca9",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// const { connectors } = getDefaultWallets({
//   appName: "Chainellation",
//   chains,
// });

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
//   webSocketProvider,
// });

// const config = createConfig({
//   autoConnect: true,
//   publicClient: createPublicClient({
//     chain: sepolia,
//     transport: http(),
//   }),
// });

function MyApp({ Component, pageProps }: AppProps) {
  // const { address, isConnecting, isDisconnected } = useAccount();

  // const { chain, chains } = useNetwork();
  const [abi, setAbi] = useState<Deployment>({
    chainellationAddress: "0x0",
    displayName: "chainellation",
    currency: "eth",
    decoAddress: "0x0",
    chain: "none",
  });
  // useEffect(() => {
  //   console.log("index effect: " + chain?.name);
  //   chain?.name &&
  //   chain.name.toLowerCase() != abi.chainellationAddress &&
  //   Deployments.hasOwnProperty(chain.name.toLowerCase())
  //     ? setAbi(Deployments[chain.name.toLowerCase()])
  //     : setAbi(Deployments["chainellation"]);
  // }, [chain, abi?.chainellationAddress]);

  (pageProps as CustomProps).activeDeployment = Deployments["sepolia"];

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#EA8F21",
        })}
        chains={chains}
      >
        <Header deploy={(pageProps as CustomProps).activeDeployment} />
        <Component {...pageProps} />
        <Footer />
        <Analytics />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

interface CustomProps extends AppProps {
  activeDeployment: Deployment;
  user: Address;
}

export default MyApp;
