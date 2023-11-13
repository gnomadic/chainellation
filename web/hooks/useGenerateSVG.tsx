import { BigNumber } from "ethers";
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
      {
        internalType: "uint256",
        name: "gazed",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "cloudsAt",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "sunUp",
        type: "bool",
      },
    ],
    name: "generateSVG",
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

const useGenerateSVG = ({
  contractAddress,
  index,
  enabled,
}: {
  contractAddress: Address;
  index: number;
  enabled?: boolean | undefined;
}) => {
  const {
    data: image,
    isError: isImageError,
    isLoading: isImageLoading,
    refetch: refetchImage,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "generateSVG",
    args: [index, 0, 0, false],
    enabled: enabled != undefined ? enabled : true,
  });

  const [svg, setSVG] = useState("");

  useEffect(() => {
    if (image) {
      setSVG(image as string);
    }
  }, [image]);

  return { svg, isImageError };
};

export default useGenerateSVG;

// const {
//   data: image,
//   isError: isImageError,
//   isLoading: isImageLoading,
//   refetch: refetchImage,
// } = useContractRead({
//   address: abi.addressOrName,
//   abi: ChainellationABI,
//   functionName: "generateSVG",
//   enabled: abi.addressOrName !== "0x0" && currentSupply !== undefined,
//   args: [
//     currentSupply ? BigNumber.from(currentSupply).toNumber() : 0,
//     0,
//     0,
//     false,
//   ],
//   onError(error) {
//     console.log("Error", error);
//   },
// });
