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

const useNFTHeldIdByIndex = ({
  contractAddress,
  walletAddress,
  index,
  enabled = true,
}: {
  contractAddress: Address;
  walletAddress: Address;
  index: number;
  enabled: boolean | undefined;
}) => {
  const {
    data: heldId,
    isError: isHeldIdError,
    isLoading: isHeldIdLoading,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "tokenOfOwnerByIndex",
    enabled: contractAddress !== "0x0" && enabled,
    args: [walletAddress, index],
    onError: (error: any) => {
      console.log("error: " + error);
    },
  });

  const [NFTID, setNFTID] = useState(0);

  useEffect(() => {
    if (heldId) {
      setNFTID(BigNumber.from(heldId).toNumber());
    }
  }, [heldId]);

  return { NFTID, isHeldIdError };
};

export default useNFTHeldIdByIndex;
