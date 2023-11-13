import type { NextPage } from "next";
import Image from "next/future/image";

import ConnectWallet from "../components/ConnectWallet";
import { useEffect } from "react";
import ClientOnly from "../components/ClientOnly";
import StarShipMint from "../components/StarShips/StarShipMint";
import StarShipHeld from "../components/StarShips/StarShipHeld";
import { useAccount } from "wagmi";

const Explore: NextPage = (props: any) => {
  console.log("night sky props: " + JSON.stringify(props));

  const { address } = useAccount();

  // useEffect(() => {
  //   if (!address) {
  //     return <ConnectWallet />;
  //   }
  // }, []);

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
              <StarShipMint deploy={props.activeDeployment} />
              <div
                aria-hidden="true"
                className="relative inset-0 z-0 pt-24 min-w-max bg-gradient-to-b from-clearslate/0 via-clearslate/50 to-clearslate"
              />
              <StarShipHeld address={address} deploy={props.activeDeployment} />
              <div
                aria-hidden="true"
                className="pt-24 relative min-w-max inset-0 z-[1] bg-gradient-to-b from-clearslate via-clearslate/50 to-clearslate/0"
              />
            </section>
          </main>
        ) : (
          <ConnectWallet />
        )}
      </section>
    </ClientOnly>
  );
};

export default Explore;
