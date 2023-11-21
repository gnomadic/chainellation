import Image from "next/future/image";
import { useEffect, useState } from "react";
import { Address } from "../../domain/Domain";
import useNFTBalance from "../../hooks/useNFTBalance";
import useNFTSVG from "../../hooks/useNFTSVG";
import placeholder from "../../images/cardback.png";
import { FreeDecorations } from "../../domain/deployments";
import useNFTTokensOfOwner from "../../hooks/useNFTTokensOfOwner";

type DecoCardProp = {
  walletAddress: Address;
  decoAddress: Address;
  chainellationTokenId: number;
  decoTokenId: number;
  updateSelection: (svg: string, decoAddress: Address, decoId: number) => void;
  deactivate: boolean;
  chain: string;
};

function DecoCard(props: DecoCardProp) {
  const [active, setActive] = useState<boolean>(false);

  // const { NFTid, isHeldIdError } = useNFTTokenOfOwnerByIndex({
  //   contractAddress: props.decoAddress,
  //   walletAddress: props.walletAddress,
  //   index: props.index,
  //   enabled: !FreeDecorations[props.chain].includes(props.decoAddress, 0),
  // });

  const { svg: curImage, isMetaError } = useNFTSVG({
    contractAddress: props.decoAddress,
    walletAddress: props.walletAddress,
    tokenId: FreeDecorations[props.chain].includes(props.decoAddress, 0)
      ? props.chainellationTokenId
      : props.decoTokenId,
  });
  useEffect(() => {
    if (props.deactivate) {
      setActive(false);
    }
  }, [props.deactivate]);

  return (
    <div>
      <Image
        alt="minting"
        src={curImage ? curImage : placeholder}
        className={
          "mx-auto border-4 rounded-lg " +
          (active ? " border-offwhite" : "border-lightgray")
        }
        width={128}
        height={128}
        onClick={() => {
          if (!active) {
            setActive(!active);

            props.updateSelection(
              curImage,
              props.decoAddress,
              FreeDecorations[props.chain].includes(props.decoAddress, 0)
                ? props.chainellationTokenId
                : props.decoTokenId
            );
          }
          if (active) {
          }
        }}
      />
    </div>
  );
}

type DecoSetProps = {
  decoAddress: Address;
  user: Address;
  updateSelection: (svg: string, decoAddress: Address, decoId: number) => void;
  chainellationTokenId: number;
  deactivate: boolean;
  activate: number;
  chain: string;
};

function DecoSet(props: DecoSetProps) {
  // const { NFTBalance: decoBalance, isBalanceError } = useNFTBalance({
  //   contractAddress: props.decoAddress,
  //   walletAddress: props.user,
  // });

  const [usableIds, setUsableIds] = useState<number[]>([]);

  const { NFTids, isHeldIdError } = useNFTTokensOfOwner({
    contractAddress: props.decoAddress,
    walletAddress: props.user,
    enabled: !FreeDecorations[props.chain].includes(props.decoAddress, 0),
  });

  useEffect(() => {
    if (NFTids.length > 0) {
      setUsableIds(NFTids);
    }
    if (FreeDecorations[props.chain].includes(props.decoAddress, 0)) {
      setUsableIds([props.chainellationTokenId]);
    }
  }, [NFTids, props]);

  return (
    <>
      {Array.from({ length: usableIds.length }).map((object, i) => {
        return (
          <DecoCard
            key={i}
            walletAddress={props.user}
            decoAddress={props.decoAddress}
            chainellationTokenId={props.chainellationTokenId}
            decoTokenId={NFTids[i]}
            updateSelection={props.updateSelection}
            deactivate={props.deactivate}
            chain={props.chain}
          />
        );
      })}
    </>
  );
}

type DecoRowProps = {
  user: Address;
  updateSelection: (svg: string, decoAddress: Address, decoId: number) => void;
  chainellationTokenId: number;
  decoType: number;
  decos: string[];
  decoIds: number[];
  chain: string;
};

export default function DecorationRow(props: DecoRowProps) {
  const [selectedSet, setSelectedSet] = useState<number>(-1);
  const [selectedCard, setSelectedCard] = useState<number>(-1);

  return (
    <>
      {props.decoIds.map((object, i) => {
        // console.log("Decortion row: " + i);
        if (object == props.decoType) {
          return (
            <DecoSet
              key={i}
              user={props.user}
              decoAddress={props.decos[i] as Address}
              chainellationTokenId={props.chainellationTokenId}
              updateSelection={(
                svg: string,
                decoAddress: Address,
                decoId: number
              ) => {
                setSelectedSet(i);
                setSelectedCard(decoId);

                props.updateSelection(svg, decoAddress, decoId);
              }}
              deactivate={selectedSet != i}
              activate={selectedSet != i ? -1 : selectedCard}
              chain={props.chain}
            />
          );
        }
      })}
    </>
  );
}
