import type { NextPage } from "next";
import Image from "next/future/image";
import NightSkyHeld from "../components/Held/NightSkyHeld";
import { useAccount } from "wagmi";
import ConnectWallet from "../components/ConnectWallet";
import ClientOnly from "../components/ClientOnly";
import useDeployment from "../hooks/useDeployment";
import Head from "next/head";

const Stargaze: NextPage = (props: any) => {
  console.log("props: " + JSON.stringify(props));
  const { address } = useAccount();
  const { deploy } = useDeployment();
  return (
    <ClientOnly>
      <Head>
        <title>Chainellation - Stargaze</title>
      </Head>
      {address ? (
        <section>
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
              <div
                aria-hidden="true"
                className="relative inset-0 z-0 pt-24 min-w-max bg-gradient-to-b from-clearslate/0 via-clearslate/50 to-clearslate"
              />
              <NightSkyHeld address={address} deploy={deploy} />
              <div
                aria-hidden="true"
                className="pt-24 relative min-w-max inset-0 z-[1] bg-gradient-to-b from-clearslate via-clearslate/50 to-clearslate/0"
              />
            </section>
          </main>
        </section>
      ) : (
        <ConnectWallet />
      )}
    </ClientOnly>
  );
};

export default Stargaze;
