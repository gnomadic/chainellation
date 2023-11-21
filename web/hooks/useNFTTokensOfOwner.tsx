import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "../domain/Domain";
import { isArray } from "util";

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "tokensOfOwner",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const useNFTTokensOfOwner = ({
  contractAddress,
  walletAddress,
  enabled,
}: {
  contractAddress: Address;
  walletAddress: Address;
  enabled: boolean;
}) => {
  const {
    data: heldIds,
    isError: isHeldIdError,
    isLoading: isHeldIdLoading,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "tokensOfOwner",
    enabled: enabled,
    args: [walletAddress],
    onError: (error: any) => {
      console.log("error: " + error);
    },
  });

  const [NFTids, setNFTIds] = useState<number[]>([]);

  useEffect(() => {
    // console.log("hook heldid: ", JSON.stringify(heldIds));
    if (isArray(heldIds)) {
      setNFTIds(heldIds as number[]);
    }

    // console.log("hook nftid: ", JSON.stringify(NFTids));
  }, [heldIds]);

  return { NFTids, isHeldIdError };
};

export default useNFTTokensOfOwner;

// const {
//   data: heldId,
//   isError: isHeldIdError,
//   isLoading: isHeldIdLoading,
// } = useContractRead({
//   address: props.abi.addressOrName,
//   abi: ChainellationABI,
//   functionName: "tokenOfOwnerByIndex",
//   enabled: props.abi.addressOrName !== "0x0",
//   args: [props.address, props.index],
//   onError: (error: any) => {
//     console.log("error: " + error);
//   },
// });
