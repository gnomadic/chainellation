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

export default function Index() {
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
          <div className="relative z-10 pt-18 bg-clearslate font-roboto py-16">
            {/* <div className="text-6xl font-normal uppercase leading-normal text-center text-offwhite font-arb">
              Chainellations
            </div> */}
            <div className="text-6xl font-normal uppercase leading-normal text-center text-offwhite font-arb">
              Explore the Cosmos
            </div>
            <div className="w-20 mx-auto h-[0px] border-2 border-boldorange"></div>
            <section className="text-offwhite text-xl px-36">
              <div className="pt-12 ">
                Unveil the beauty of the night sky like never before with
                Chainellations, the groundbreaking generative art experiment on
                the blockchain.
              </div>
              <div className="pt-12">
                Chainellations is not just an NFT; it&apos;s a celestial
                experience tailored just for you. When you mint your unique
                night sky, the magic begins. Based on your timezone, the NFT
                dynamically renders either a starry night or a sunlit sky.
              </div>
              {/* <div className="pt-12 font-bold border-b-2 border-b-boldred w-60">
                What is Chainellations?
              </div> */}
              <div className="grid grid-cols-1 gap-16 pt-28 md:grid-cols-2 font-roboto ">
                <FeatureCard
                  title="🌌 Mint Your Unique Night Sky"
                  description="Dive into the cosmos by minting your own Chainellation. The process is simple, and each NFT is a one-of-a-kind view.  You can choose to customize your creation or roll for a randomly generated sky."
                  icon={baselogo}
                />
                <FeatureCard
                  title="🕰️ Your Timezone shapes Your Experience"
                  description="Your Chainellation responds to the rhythm of the Earth.  When you mint your NFT knows your timezone, so you can watch as the artwork dynamically shifts between day and night. During the day, bask in the warmth of the sun, and as night falls, the stars come alive, creating a personalized celestial canvas just for you."
                  icon={settingscog}
                />
                <FeatureCard
                  title="🌟 Stargaze Nightly, Reveal Your Universe"
                  description="Unveil the secrets of your night sky by stargazing once a day when the sun is down where ever you are in the world.  As you stargaze new stars are revealed, bringing you one step closer to discovering your hidden zodiac constellation."
                  icon={exploreicon}
                />
                <FeatureCard
                  title="🎨 Customize and Witness Evolution"
                  description="Tailor your Chainellation with three unique customizations. Watch as these elements evolve over time, reflecting the dynamic nature of the cosmos and creating a universe that's as unique as you are."
                  icon={exploreicon}
                />
              </div>
              {/* <div className="pt-6">
                Chainellations is not just an NFT; it&apos;s a celestial
                experience tailored just for you. When you mint your unique
                night sky, the magic begins. Based on your timezone, the NFT
                dynamically renders either a starry night or a sunlit sky.
              </div>
              <div className="pt-12 ">
                <div>🌌 Stargaze Once a Day:</div> At night, the stars come to
                life. Every day, indulge in a moment of stargazing and watch as
                a new star twinkles into existence. Each star unveils a hidden
                zodiac constellation, adding a touch of mystery to your cosmic
                journey.
              </div>
              <div className="pt-12 ">
                <div>🌟 Discover Your Constellation:</div>Every Chainellation
                holds a secret – a hidden zodiac constellation. With each star
                you reveal, unlock the beauty of these celestial patterns in
                your personal night sky.
              </div>
              <div className="pt-12 ">
                <div>🎨 Customize Your Universe: </div>Make your Chainellation
                uniquely yours. Choose from three customizable options to shape
                how your night sky is displayed. As you stargaze, watch these
                customizations evolve, reflecting the dynamic nature of the
                cosmos.
              </div> */}
              {/* <div className="pt-12 font-bold border-b-2 border-b-boldred w-60">
                How to Get Started:
              </div>
              <div>
                Mint Your Night Sky: Dive into the cosmos by minting your own
                Chainellation. The process is simple, and each NFT is a
                one-of-a-kind masterpiece.
              </div>
              <div>
                Set Your Timezone: Your Chainellation knows your timezone.
                Experience the magic of the night sky or the warmth of the sun
                based on your location.
              </div>
              <div>
                Stargaze Daily: Unveil the secrets of your night sky by
                stargazing once a day. Each star brings you closer to
                discovering your hidden zodiac constellation.
              </div>
              <div>
                Customize and Evolve: Tailor your Chainellation with three
                unique customizations. Witness these elements evolve over time,
                creating a universe that&apos;s as dynamic as it is beautiful.
              </div> */}
              <div className="text-6xl font-normal uppercase leading-normal text-center text-offwhite font-arb pt-28">
                Join the Cosmic Community
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
