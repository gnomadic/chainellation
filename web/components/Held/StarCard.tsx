import Image, { StaticImageData } from "next/future/image";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import abi from "../../abi/Chainellation.json";
// import { ABI } from "../../domain/Domain";
import { BigNumber } from "ethers";
import { useState } from "react";
import useNFTSVGByIndex from "../../hooks/useNFTSVGByIndex";
import { Address, Deployment } from "../../domain/Domain";
import Link from "next/link";
import useNFTTokenOfOwnerByIndex from "../../hooks/useNFTTokenOfOwnerByIndex";
import placeholder from "../../images/cardback.png";

type StarCardProps = {
  // abi: ABI;
  deploy: Deployment;
  address: Address;
  index: number;
  onClick: (curImage: string | StaticImageData) => void;
};

export default function StarCard(props: StarCardProps) {
  const { svg: curImage, isMetaError } = useNFTSVGByIndex({
    contractAddress: props.deploy.chainellationAddress,
    walletAddress: props.address,
    index: props.index,
    enabled: true,
  });

  const [showGaze, setShowGaze] = useState<boolean>(false);

  const {
    data: heldId,
    isError: isHeldIdError,
    isLoading: isHeldIdLoading,
  } = useContractRead({
    address: props.deploy.chainellationAddress,
    abi: abi.abi,
    functionName: "tokenOfOwnerByIndex",
    enabled: props.deploy.chainellationAddress !== "0x0",
    args: [props.address, props.index],
    onError: (error: any) => {
      console.log("error: " + error);
    },
  });

  // const { NFTid: heldId, isHeldIdError } = useNFTTokenOfOwnerByIndex(
  //   props.deploy.chainellationAddress,
  //   props.address,
  //   props.index,
  //   true
  // );

  // const {
  //   data: daysSince,
  //   isError: isDaysSinceError,
  //   isLoading: isDaysSinceLoading,
  // } = useContractRead({
  //   address: props.deploy.chainellationAddress,
  //   abi: abi.abi,
  //   functionName: "daysSinceLastGust",
  //   enabled: props.deploy.chainellationAddress !== "0x0",
  //   args: [heldId],
  //   onError: (error: any) => {
  //     console.log("error: " + error);
  //   },
  // });

  const {
    data: userTime,
    isError: isUserTimeError,
    isLoading: isUserTimeLoading,
  } = useContractRead({
    address: props.deploy.chainellationAddress,
    abi: abi.abi,
    functionName: "systemTimeOffsetWithUser",
    enabled: props.deploy.chainellationAddress !== "0x0",
    args: [heldId],
    onError: (error: any) => {
      console.log("error: " + error);
    },
  });

  const {
    data: sysTime,
    isError: isSysTimeError,
    isLoading: isSysTimeLoading,
  } = useContractRead({
    address: props.deploy.chainellationAddress,
    abi: abi.abi,
    functionName: "systemTime",
    enabled: props.deploy.chainellationAddress !== "0x0",
    onError: (error: any) => {
      console.log("error: " + error);
    },
  });

  const { config: gazeConfig, error: gazeError } = usePrepareContractWrite({
    address: props.deploy.chainellationAddress,
    abi: abi.abi,
    functionName: "starGaze",
    enabled:
      props.deploy.chainellationAddress !== "0x0" && heldId !== undefined,
    args: [1],
    onError: (error: any) => {
      console.log("error: " + error);
      setShowGaze(false);
    },
    onSuccess: () => {
      setShowGaze(true);
    },
  });
  const { write: gazeWrite } = useContractWrite(gazeConfig);

  return (
    <div className="mt-3 text-xl">
      <div>
        {heldId && Number(heldId.toString()) > 0 ? (
          <h1 className="pt-3 pb-3 text-center text-offwhite">
            constellation #{heldId.toString()}
          </h1>
        ) : (
          <h1 className="pt-3 pb-3 text-center text-offwhite">Loading...</h1>
        )}
        <div
          onClick={() => {
            props.onClick(curImage ? curImage : placeholder);
          }}
          className="border-boldorange rounded-lg border-[2px] leading-[0rem]"
        >
          <Image
            alt="held"
            src={curImage ? curImage : placeholder}
            className="mx-auto rounded-lg"
            width={512}
            height={512}
          />
        </div>
        <div className="grid grid-cols-1">
          <button
            className="px-12 py-4 mx-auto mt-2 border-2 rounded cursor-pointer bg-boldred border-boldorange"
            disabled={!showGaze}
            onClick={() => {
              gazeWrite?.();
            }}
          >
            stargaze
          </button>
          <div className="px-12 py-4 mx-auto mt-2 border-2 rounded cursor-pointer border-boldorange">
            <Link href="/compose/[id]" as={`/compose/${props.index}`}>
              <div className="relative cursor-pointer">Compose</div>
            </Link>
          </div>
        </div>

        {/* <div>
            <p>ok: {BigNumber.from(daysSince)?.toNumber()}</p>
            <p> sysTime: {BigNumber.from(sysTime)?.toNumber()}</p>
            <p>time: {BigNumber.from(userTime)?.toNumber()}</p>
          </div> */}
      </div>
    </div>
  );
}
