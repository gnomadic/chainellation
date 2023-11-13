import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "../domain/Domain";

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

const useNFTSVG = ({
  contractAddress,
  walletAddress,
  tokenId,
}: {
  contractAddress: Address;
  walletAddress: Address;
  tokenId: number;
}) => {
  const {
    data: meta,
    isError: isMetaError,
    isLoading: isMetaLoading,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "tokenURI",
    enabled: contractAddress !== "0x0" && tokenId != undefined,
    args: [tokenId],
    onError: (error: any) => {
      console.log("error getting metadata: " + error);
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

export default useNFTSVG;
