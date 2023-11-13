import type { NextPage } from "next";
import Image from "next/future/image";
import concept from "../images/concept.webp";
import socialx from "../images/social/social-x.svg";
import socialdiscord from "../images/social/social-discord.svg";
import socialgitbook from "../images/social/social-gitbook.svg";
import baselogo from "../images/designed/base-logo.svg";
import settingscog from "../images/designed/settings-cog.svg";
import exploreicon from "../images/designed/explore-icon.svg";
import playicon from "../images/designed/play-game.svg";
import moonicon from "../images/designed/moon-circle.svg";
import transporticon from "../images/designed/transport-logo.svg";
import mars from "../images/designed/mars.svg";
import Social from "../components/Social";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectWallet() {
  return (
    <section>
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
          <div
            aria-hidden="true"
            className="relative inset-0 z-0 pt-24 min-w-max bg-gradient-to-b from-clearslate/0 via-clearslate/50 to-clearslate"
          />
          <div className="relative z-10 md:pt-18 bg-clearslate font-roboto py-16">
            <section className="text-offwhite text-xl md:px-36">
              <div className="text-2xl md:text-6xl font-normal uppercase leading-normal text-center text-offwhite font-arb md:pt-28">
                Connect your wallet to Join the Cosmic Community
              </div>
              <div className="w-20 mx-auto h-[0px] border-2 border-boldorange"></div>

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
  icon: string;
};

function FeatureCard(props: FeatureCardProp) {
  return (
    <div>
      <p className="text-[#EA8F21] border-b-2 border-[#98161D] text-3xl md:text-2xl lg:text-4xl pb-4 font-bold uppercase">
        {/* <span className="inline-block pr-4">
          <Image width={30} height={30} src={props.icon} alt="logo" />
        </span> */}
        {props.title}
      </p>
      <p className="pt-4 text-xl text-lightgray">{props.description}</p>
    </div>
  );
}
