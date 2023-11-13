import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "../domain/Domain";

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const useNFTTokenOfOwnerByIndex = ({
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
  const {
    data: heldId,
    isError: isHeldIdError,
    isLoading: isHeldIdLoading,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "tokenOfOwnerByIndex",
    enabled: enabled != undefined ? enabled : true,
    args: [walletAddress, index],
    onError: (error: any) => {
      console.log("error: " + error);
    },
  });

  const [NFTid, setNFTId] = useState(0);

  useEffect(() => {
    console.log("hook heldid: ", heldId);
    if (heldId) {
      setNFTId(BigNumber.from(heldId).toNumber());
    }
    console.log("hook nftid: ", NFTid);
  }, [heldId]);

  return { NFTid, isHeldIdError };
};

export default useNFTTokenOfOwnerByIndex;

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
