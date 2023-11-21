import Image from "next/image";
import { usePrepareContractWrite } from "wagmi";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { Address, Deployment } from "../../domain/Domain";
import useAvailableDeco from "../../hooks/useAvailableDeco";
import { replaceTag } from "../../utils/svgcombiner";
import DecoType from "./DecoType";
import placeholder from "../../images/cardback.png";
import { waitForTransaction, writeContract } from "@wagmi/core";
import abi from "../../abi/Decorations.json";
import useNFTSVG from "../../hooks/useNFTSVG";

type ComposeCardProps = {
  deploy: Deployment;
  tokenId: number;
  walletAddress: Address;
};

export default function ComposeCard(props: ComposeCardProps) {
  const { svg: curImage, isMetaError } = useNFTSVG({
    contractAddress: props.deploy.chainellationAddress,
    walletAddress: props.walletAddress,
    tokenId: props.tokenId,
  });

  const {
    decos: available,
    decoIds: availableIds,
    isDecosError,
  } = useAvailableDeco({
    contractAddress: props.deploy.decoAddress,
    walletAddress: props.walletAddress,
  });

  const [tokenId, setTokenId] = useState<number>(0);
  const [decoTypes, setDecoTypes] = useState<number[]>([]);
  const [decoAddresses, setDecoAddresses] = useState<Address[]>([]);
  const [decoIds, setDecoIds] = useState<number[]>([]);
  const [liveImage, setLiveImage] = useState<string>("");

  useEffect(() => {
    if (curImage) {
      // extractSVG(curImage);

      // console.log("curimage: " + curImage);

      //curimage: data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2xpcFBhdGggaWQ9ImJveCI+PHBhdGggZD0iTTAgMGg1MTJ2NTEySDB6Ii8+PC9jbGlwUGF0aD48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InNreUdyYWRpZW50IiBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKDE2KSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iaHNsKDcwLDEwMCUsMzAlKSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iaHNsKDEwLDEwMCUsMzAlKSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJjbG91ZEdyYWRpZW50IiBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKDE2KSI+PHN0b3Agc3RvcC1vcGFjaXR5PSIuMSIgb2Zmc2V0PSIxNSUiLz48c3RvcCBzdG9wLW9wYWNpdHk9Ii41IiBvZmZzZXQ9IjMwJSIvPjxzdG9wIHN0b3Atb3BhY2l0eT0iLjEiIG9mZnNldD0iNTAlIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImRheUdyYWRpZW50IiBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKDEzKSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iaHNsKDI1MCwxMDAlLDkwJSkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9ImhzbCgxOTAsMTAwJSwzMCUpIi8+PC9saW5lYXJHcmFkaWVudD48ZmlsdGVyIGlkPSJzdGFycyI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIuMzUiIHNlZWQ9IjQ5NyIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgOSAtNCAwIDAgMCA5IC00IDAgMCAwIDkgLTQgMCAwIDAgMCAxIi8+PC9maWx0ZXI+PGZpbHRlciBpZD0iY2xvdWRzIiB4PSItNTAlIiB5PSItNTAlIiBoZWlnaHQ9IjIwMCUiIHdpZHRoPSIyMDAlIj48ZmVHYXVzc2lhbkJsdXIgaW49InNreSIgc3RkRGV2aWF0aW9uPSIyMCIgcmVzdWx0PSJza3libHVyIi8+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9Ii4wMSIgbnVtT2N0YXZlcz0iNSIgcmVzdWx0PSJza3lub2lzZSIgc2VlZD0iNDk3Ii8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIxIDAgMCAwIDAgMSAwIDAgMCAwIDEgMCAwIDAgMCAzIC0xIC0xIDAgMCIvPjxmZUNvbXBvc2l0ZSBvcGVyYXRvcj0iaW4iIGluMj0iU291cmNlR3JhcGhpYyIvPjwvZmlsdGVyPjxmaWx0ZXIgaWQ9ImxpZ2h0Ij48ZmVTcGVjdWxhckxpZ2h0aW5nIHJlc3VsdD0ic3BlY091dCIgc3BlY3VsYXJFeHBvbmVudD0iMTAwIiBsaWdodGluZy1jb2xvcj0id2hpdGUiPjxmZVBvaW50TGlnaHQgeD0iMTAiIHk9IjcwIiB6PSIzMDAiLz48L2ZlU3BlY3VsYXJMaWdodGluZz48ZmVDb21wb3NpdGUgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0ic3BlY091dCIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsxPSIwIiBrMj0iMSIgazM9IjEiIGs0PSIwIi8+PC9maWx0ZXI+PC9kZWZzPjxzdmcgdmlld0JveD0iMCAwIDUxMiA1MTIiIGNsaXAtcGF0aD0idXJsKCNib3gpIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjc3RhcnMpIiBvcGFjaXR5PSIxIi8+PHBhdGggZmlsbD0idXJsKCNkYXlHcmFkaWVudCkiIGQ9Ik0wIDBoNTEydjUxMkgweiIgb3BhY2l0eT0iMCIgIGZpbHRlcj0idXJsKCNsaWdodCkiLz48cGF0aCBmaWxsPSJ1cmwoI3NreUdyYWRpZW50KSIgIGQ9Ik0wIDBoNTEydjUxMkgweiIgb3BhY2l0eT0iLjciLz48cGF0aCBmaWxsPSJ1cmwoI2Nsb3VkR3JhZGllbnQpIiBmaWx0ZXI9InVybCgjY2xvdWRzKSIgZD0iTTAgMGg1NjV2NTEySDB6Ii8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjM0LC0yOTApLCByb3RhdGUoMCkiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuOCI+PC9nPjxnIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjciPjwvZz48ZyBpZD0ic2t5bWF0aCI+PC9nPjxnIGlkPSJkZWNvIj48L2c+PGcgaWQ9InNpbGhvdWV0dGUiPjwvZz48L3N2Zz48L3N2Zz4=
      setLiveImage(curImage);
    }
  }, [curImage]);

  function updateBatch(decoType: number, decoAddress: Address, decoId: number) {
    // console.log(
    //   "updateBatch, parameters are: " +
    //     JSON.stringify({
    //       decoType: decoType,
    //       decoAddress: decoAddress,
    //       decoId: decoId,
    //     })
    // );
    const index = decoTypes.indexOf(decoType);
    console.log("updateBatch, index is: " + index);
    if (index === -1) {
      // If decoType doesn't exist, add the values to the arrays
      // console.log("setting tokenid: " + NFTID);
      setTokenId(props.tokenId);
      // console.log("setting decotypes: " + [...decoTypes, decoType]);
      setDecoTypes([...decoTypes, decoType]);
      // console.log("setting decoAddresses: " + [...decoAddresses, decoAddress]);

      setDecoAddresses([...decoAddresses, decoAddress]);
      // console.log("setting decoIds: " + [...decoIds, decoId]);

      setDecoIds([...decoIds, decoId]);
      // console.log("done?");
    } else {
      // If decoType exists, replace the values at the corresponding index
      const updatedDecoAddresses = [...decoAddresses];
      updatedDecoAddresses[index] = decoAddress;
      setDecoAddresses(updatedDecoAddresses);

      const updatedDecoId = [...decoIds];
      updatedDecoId[index] = decoId;
      setDecoIds(updatedDecoId);

      // setTokenIds([...tokenIds, NFTID]);
    }
    // console.log("prepped: " + decoTypes);
  }

  function setImageLayer(
    svg: string,
    decoAddress: Address,
    decoId: number,
    layer: string,
    layerIndex: number
  ) {
    let replaced = replaceTag(liveImage, svg, layer);
    let built = "data:image/svg+xml;base64," + window.btoa(replaced);
    setLiveImage(built);
    updateBatch(layerIndex, decoAddress, decoId);
  }

  const { config, error } = usePrepareContractWrite({
    address: props.deploy.decoAddress,
    abi: abi.abi,
    functionName: "setDecorationBatch",
    args: [tokenId, decoTypes, decoAddresses, decoIds],
  });

  return (
    <div className="text-xl font-roboto ">
      <div>
        <h1 className="pt-12 pb-3 text-3xl text-center text-offwhite font-kdam">
          constellation #{props.tokenId}
        </h1>
        <div className="grid grid-cols-1 xl:grid-cols-2">
          <div>
            <div className="border-boldorange border-[2px] max-w-[512px] max-h-[512px] leading-[0rem] mx-auto mt-12">
              <Image
                alt="held"
                src={liveImage ? liveImage : placeholder}
                className="rounded-lg"
                width={512}
                height={512}
              />
            </div>
            <div
              className="border-[#EA8F21] bg-[#98161D] w-[512] mx-auto rounded-lg border-[4px] py-6 mt-4 text-center text-offwhite max-w-[512px]"
              onClick={async () => {
                // write?.();
                try {
                  console.log(
                    "config: " +
                      JSON.stringify({
                        tokenId: tokenId,
                        decoTypes: decoTypes,
                        decoAddresses: decoAddresses,
                        decoIds: decoIds,
                      })
                  );

                  const { hash } = await writeContract(config);
                  // console.log("hash: " + hash);
                  const data = await waitForTransaction({
                    confirmations: 1,
                    hash,
                  });
                  // console.log("data: " + data);
                  // refetchSupply();
                  // refetchImage();
                  console.log("refetched");
                } catch (e) {
                  console.log("errorx: " + e);
                  // setErr("insufficient funds");
                }
              }}
            >
              APPLY
            </div>
            {/* <div>{String(error)}</div> */}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-1">
            <DecoType
              chainellationId={props.tokenId}
              decoIds={availableIds}
              decos={available}
              walletAddress={props.walletAddress}
              setFunction={setImageLayer}
              filterOn={1}
              layerName="silhouette"
              title="Silhouette Layer"
              chain={props.deploy.chain}
            />

            <DecoType
              chainellationId={props.tokenId}
              decoIds={availableIds}
              decos={available}
              walletAddress={props.walletAddress}
              setFunction={setImageLayer}
              filterOn={2}
              layerName="skymath"
              title="Sky Layer"
              chain={props.deploy.chain}
            />

            <DecoType
              chainellationId={props.tokenId}
              decoIds={availableIds}
              decos={available}
              walletAddress={props.walletAddress}
              setFunction={setImageLayer}
              filterOn={3}
              layerName="deco"
              title="Decoration Layer"
              chain={props.deploy.chain}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
