import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "../domain/Domain";
import useNFTHeldIdByIndex from "./useNFTHeldId";

const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const useNFTSVGByIndex = ({
  contractAddress,
  walletAddress,
  index,
  enabled,
}: {
  contractAddress: Address;
  walletAddress: Address;
  index: number;
  enabled?: boolean | undefined;
}) => {
  const { NFTID, isHeldIdError } = useNFTHeldIdByIndex({
    contractAddress: contractAddress,
    walletAddress: walletAddress,
    index: index,
    enabled: enabled != undefined ? enabled : true,
  });

  const {
    data: meta,
    isError: isMetaError,
    isLoading: isMetaLoading,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "tokenURI",
    enabled: contractAddress !== "0x0" && NFTID !== 0 && enabled,
    args: [NFTID],
    onError: (error: any) => {
      console.log("error: " + error);
    },
  });

  const [svg, setSVG] = useState("");

  useEffect(() => {
    if (meta) {
      setSVG(
        JSON.parse(
          window.atob(String(meta).replace("data:application/json;base64,", ""))
        ).image
      );
    }
  }, [meta]);

  return { svg, isMetaError };
};

export default useNFTSVGByIndex;
