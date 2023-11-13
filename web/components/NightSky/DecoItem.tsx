import Image from "next/image";
import { useState } from "react";
import useNFTSVG from "../../hooks/useNFTSVG";
import useNFTBalance from "../../hooks/useNFTBalance";
import { Address } from "../../domain/Domain";
import { FreeDecorations } from "../../domain/deployments";

type DecoItemProp = {
  walletAddress: Address;
  decoAddress: Address;
  chainellationTokenId: number;
  updateSelection: (svg: string, decoAddress: Address, decoId: number) => void;
  chain: string;
};

type DecoCardProp = {
  walletAddress: Address;
  decoAddress: Address;
  tokenID: number;
  // disable: boolean;
  updateSelection: (svg: string, decoAddress: Address, decoId: number) => void;
  index: number;
  setSelected: (index: number) => void;
  activated: boolean;
  chain: string;
  chainellationTokenId: number;
};

function DecoCard(props: DecoCardProp) {
  const [active, setActive] = useState<boolean>(false);

  const { svg: curImage, isMetaError } = useNFTSVG({
    contractAddress: props.decoAddress,
    walletAddress: props.walletAddress,
    tokenId: props.tokenID,
  });

  return (
    <div>
      {curImage ? (
        <div>
          <div
            className={
              "rounded-lg border-4 leading-[0rem] " +
              (props.activated ? "border-offwhite" : "border-lightgray")
            }
          >
            <Image
              alt="minting"
              src={curImage}
              className="mx-auto border-4 rounded-lg border-bright"
              width={512}
              height={512}
              onClick={() => {
                setActive(!active);
                props.updateSelection(
                  curImage,
                  props.decoAddress,
                  FreeDecorations[props.chain].includes(props.decoAddress, 0)
                    ? props.chainellationTokenId
                    : props.tokenID
                );
                props.setSelected(props.index);
              }}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default function DecoItem(props: DecoItemProp) {
  const { NFTBalance: decoBalance, isBalanceError } = useNFTBalance({
    contractAddress: props.decoAddress,
    walletAddress: props.walletAddress,
  });

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  return (
    <div>
      {Array.from({ length: decoBalance }).map((object, i) => {
        console.log("decoitem: ", i);
        return (
          <DecoCard
            key={i}
            walletAddress={props.walletAddress}
            decoAddress={props.decoAddress}
            tokenID={props.chainellationTokenId}
            updateSelection={props.updateSelection}
            index={i}
            setSelected={(index: number) => {
              setSelectedIndex(index);
              console.log("selected index: ", index);
            }}
            activated={selectedIndex === i}
            chain={props.chain}
            chainellationTokenId={props.chainellationTokenId}
          />
        );
      })}
    </div>
  );
}
