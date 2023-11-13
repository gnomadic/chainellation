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
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const useOwnerOf = ({
  contractAddress,
  tokenId,
}: {
  contractAddress: Address;
  tokenId: BigNumber;
}) => {
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "ownerOf",
    args: [tokenId],
  });

  const [ownerOf, setOwnerOf] = useState({});

  useEffect(() => {
    if (data) {
      setOwnerOf(data);
    }
  }, [data]);

  return { ownerOf, isError };
};

export default useOwnerOf;
