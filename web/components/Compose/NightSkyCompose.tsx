import { Address, Deployment } from "../../domain/Domain";
import ComposeCard from "./ComposeCard";

type NightSkyComposeProps = {
  deploy: Deployment;
  index: number;
  walletAddress: Address;
};

export default function NightSkyCompose(props: NightSkyComposeProps) {
  return (
    <section className=" z-10 relative">
      <div className="relative z-10 bg-clearslate font-roboto md:py-16">
        <section className="text-offwhite text-xl md:px-36">
          <div className="text-2xl md:text-6xl font-normal uppercase leading-normal text-center text-offwhite font-kdam ">
            Compose
          </div>
          <div className="w-20 mx-auto h-[0px] border-2 mt-8 border-boldorange"></div>
        </section>

        <div className="pb-12 ">
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
      <div className="relative z-10  bg-clearslate">
        <ComposeCard
          deploy={props.deploy}
          index={props.index}
          walletAddress={props.walletAddress}
        />
      </div>
    </section>
  );
}
