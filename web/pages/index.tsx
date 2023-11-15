import Image from "next/future/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Hero from "../components/Hero";

export default function Index() {
  return (
    <section>
      <Head>
        <title>Chainellation</title>
      </Head>
      <main className="relative background ">
        <section
          id="connect"
          className="relative items-center min-h-screen pt-48"
        >
          <Image
            src="/bigsky.svg"
            className="fixed inset-0 object-cover w-full h-full"
            alt="night sky"
            width="4160"
            height="6240"
          />
          <Hero />
          <div
            aria-hidden="true"
            className="relative inset-0 z-0 pt-24 min-w-max bg-gradient-to-b from-clearslate/0 via-clearslate/50 to-clearslate"
          />
          <div className="relative z-10 md:pt-18 bg-clearslate  py-16">
            <div className="text-xl md:text-3xl font-normal uppercase leading-normal text-center text-offwhite font-kdam">
              An on-chain, customizable, and Generative Art NFT
            </div>
            <div className="w-20 mx-auto h-[0px] mt-8 border-2 border-boldorange"></div>
            <section></section>
            <section className="text-offwhite text-xl px-4 md:px-36 font-roboto">
              <div className="grid grid-cols-1 gap-16 pt-28 md:grid-cols-2 font-roboto ">
                <FeatureCard
                  title="🌌 Mint Your Unique Night Sky"
                  description="Dive into the cosmos by minting your own Chainellation. The process is simple, and each NFT is a one-of-a-kind view.  You can choose to customize your creation or roll for a randomly generated sky."
                />
                <FeatureCard
                  title="🕰️ Your Timezone shapes Your Experience"
                  description="Your Chainellation responds to the rhythm of the Earth.  When you mint your NFT knows your timezone, so you can watch as the artwork dynamically shifts between day and night. During the day, bask in the warmth of the sun, and as night falls, the stars come alive, creating a personalized celestial canvas just for you."
                />
                <FeatureCard
                  title="🌟 Stargaze Nightly, Reveal Your Universe"
                  description="Unveil the secrets of your night sky by stargazing once a day when the sun is down where ever you are in the world.  As you stargaze new stars are revealed, bringing you one step closer to discovering your hidden zodiac constellation."
                />
                <FeatureCard
                  title="🎨 Customize and Witness Evolution"
                  description="Tailor your Chainellation with unique customizations of three places in your image. Watch as these elements evolve over time, reflecting the dynamic nature of the cosmos and creating a universe that's as unique as you are."
                />
              </div>
              <div className="text-2xl md:text-6xl font-normal uppercase leading-normal text-center text-offwhite font-kdam pt-28">
                Join the Cosmic Community
              </div>
              <div className="w-20 mx-auto h-[0px] border-2 mt-8 border-boldorange"></div>

              <div className=" flex justify-center pt-24">
                <ConnectButton
                  chainStatus="icon"
                  accountStatus="address"
                  showBalance={false}
                />
              </div>
            </section>
          </div>
          <div
            aria-hidden="true"
            className="pt-24 relative min-w-max inset-0 z-[1] bg-gradient-to-b from-clearslate via-clearslate/50 to-clearslate/0"
          />
        </section>
      </main>
    </section>
  );
}

type FeatureCardProp = {
  title: string;
  description: string;
};

function FeatureCard(props: FeatureCardProp) {
  return (
    <div>
      <p className="text-[#EA8F21] border-b-2 border-[#98161D] text-3xl md:text-2xl lg:text-4xl pb-4 font-bold uppercase">
        {props.title}
      </p>
      <p className="pt-4 text-xl text-lightgray">{props.description}</p>
    </div>
  );
}
