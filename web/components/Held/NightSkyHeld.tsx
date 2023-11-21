import Image, { StaticImageData } from "next/future/image";
import mars from "../../images/designed/mars.svg";
import useNFTBalance from "../../hooks/useNFTBalance";
import { Address, Deployment } from "../../domain/Domain";
import StarCard from "./StarCard";
import { useState } from "react";
import NightSkyViewer from "./NightSkyViewer";
import useNFTTokensOfOwner from "../../hooks/useNFTTokensOfOwner";

type HeldProps = { deploy: Deployment; address: Address };

export default function NightSkyHeld(props: HeldProps) {
  console.log("held props", props);

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewed, setViewed] = useState<string | StaticImageData>("");

  const handleViewerClick = (curImage: string | StaticImageData) => {
    setIsViewerOpen(!isViewerOpen);
    setViewed(curImage);
  };

  const { NFTBalance: chainellations, isBalanceError } = useNFTBalance({
    contractAddress: props.deploy.chainellationAddress,
    walletAddress: props.address,
  });

  const { NFTids, isHeldIdError } = useNFTTokensOfOwner({
    contractAddress: props.deploy.chainellationAddress,
    walletAddress: props.address,
    enabled: true,
  });

  return (
    <section className="relative z-10 ">
      <div className="relative z-10 bg-clearslate font-roboto md:py-16">
        <section className="text-xl text-offwhite md:px-36">
          <div className="text-2xl font-normal leading-normal text-center uppercase md:text-6xl text-offwhite font-kdam ">
            Your Held night skies
          </div>
          <div className="w-20 mx-auto h-[0px] border-2 mt-8 border-boldorange"></div>
        </section>
        <h1 className="pt-12 text-lg text-center text-offwhite">
          you hold {NFTids.length} unique constellations
        </h1>
        <div className="p-4 mx-4 md:mx-20">
          <div className="text-offwhite">
            {NFTids.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 pt-8 text-lg font-semibold tracking-tight md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: NFTids.length }).map((object, i) => {
                  return (
                    <div key={i} className="pt-8">
                      {/* <Divider /> */}
                      <StarCard
                        deploy={props.deploy}
                        id={NFTids[i]}
                        address={props.address}
                        onClick={(curImage: string | StaticImageData) => {
                          handleViewerClick(curImage);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="pt-8 text-lg font-semibold tracking-tight">
                <h1 className="text-xl font-semibold tracking-tight ">
                  <p className="pt-3 text-bright">
                    If you just minted, you might have to refresh the page.
                  </p>
                  <p className="pt-6 ">
                    Ready to unlock the magic of stargazing?
                  </p>
                  <p className="pt-3 ">
                    Mint your very own NFT from the mint page and witness the
                    beauty of constellations.
                  </p>
                  <p className="pt-14 ">Didn&apos;t have a chance to mint?</p>
                  <p className="pt-3 ">
                    Visit your favorite NFT marketplace and embark on this
                    celestial journey today!
                  </p>
                </h1>
              </div>
            )}
          </div>
        </div>
        {/* <FeatureCard title="COMPLETELY ON CHAIN" description="All systems are completely on the blockchain, including art generation, game logic, and game state." icon={baselogo} /> <FeatureCard title="INTERACTIVE CUSTOMIZATION" description="Both night skies and star ships can be customized to your liking. Collect and trade different decorations as you play and explore." icon={settingscog} /> <FeatureCard title="EXPLORE AND DISCOVER" description="There is a big solar system out there, with many regions to explore, landmarks to visit, and secrets to uncover." icon={exploreicon} /> <FeatureCard title="ROLE PLAYING MECHANICS" description="Every star ship has stats and skills which you can use and level up as you play and explore." icon={playicon} /> <FeatureCard title="NIGHT SKY NFT COLLECTION" description="Night Sky art is procedurally generated on-demand, so it will evolve and change as you explore." icon={moonicon} /> <FeatureCard title="STAR SHIP NFT COLLECTION" description="There are multiple star ship chassis to choose from, and upgrades to unlock. Improve your skills and find better loot." icon={transporticon} /> */}
      </div>
      {isViewerOpen ? (
        <>
          <NightSkyViewer
            onClick={() => {
              handleViewerClick("");
            }}
            image={viewed}
          />
        </>
      ) : (
        <></>
      )}
    </section>
  );
}
