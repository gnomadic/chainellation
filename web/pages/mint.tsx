import type { NextPage } from "next";
import Image from "next/future/image";
import NightSkyMint from "../components/NightSky/NightSkyMint";

import { useAccount } from "wagmi";
import ConnectWallet from "../components/ConnectWallet";
import { useEffect } from "react";
import ClientOnly from "../components/ClientOnly";

const Index: NextPage = (props: any) => {
  console.log("night sky props: " + JSON.stringify(props));

  const { address } = useAccount();

  return (
    <ClientOnly>
      <section>
        {address ? (
          <main className="relative background ">
            <section
              id="nightsky"
              className="relative items-center min-h-screen pt-48"
            >
              <Image
                src="/bigsky.svg"
                className="fixed inset-0 object-cover w-full h-full"
                alt="night sky"
                width="4160"
                height="6240"
              />
              <NightSkyMint deploy={props.activeDeployment} />
            </section>
          </main>
        ) : (
          <ConnectWallet />
        )}
      </section>
    </ClientOnly>
  );
};

export default Index;
