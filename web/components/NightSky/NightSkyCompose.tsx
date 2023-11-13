import { Address, Deployment } from "../../domain/Domain";
import ComposeCard from "./ComposeCard";

type NightSkyComposeProps = {
  deploy: Deployment;
  index: number;
  walletAddress: Address;
};

export default function NightSkyCompose(props: NightSkyComposeProps) {
  return (
    <section>
      <div className="border-boldorange border-[8px] rounded-lg mx-2 z-10 relative">
        <div className="bg-[#98161D] mx-auto   text-[#F5DFB3] py-4 text-lg  text-center font-bold">
          <p className="md:text-9xl text-6xl font-jost uppercase text-[#F5DFB3] py-12">
            Compose
          </p>
        </div>
        <div className="border-4 border-boldorange"></div>
        <div className="pb-12 bg-niceblack">
          <div className="p-4 px-12 pt-12 text-xl text-offwhite md:pt-20">
            <div>Each Individual NFT has multiple customization layers</div>
            <div className="pt-6 ">
              You can replace these elements whenever you want but can only have
              one choice at each layer
            </div>
            <div className="pt-6 ">
              You&apos;ll have the opportunity to discover new customization
              options in the future by exploring the solar system, joining our
              discord, and following us on X.
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-4">
        <ComposeCard
          deploy={props.deploy}
          index={props.index}
          walletAddress={props.walletAddress}
        />
      </div>
    </section>
  );
}
