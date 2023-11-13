import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "../domain/Domain";

const abi = [
  {
    inputs: [],
    name: "mintCost",
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

const useMintCost = ({
  contractAddress,
  enabled,
}: {
  contractAddress: Address;
  enabled?: boolean | undefined;
}) => {
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "mintCost",
    enabled: enabled != undefined ? enabled : true,
  });

  const [mintCost, setMintCost] = useState(BigNumber.from(0));

  useEffect(() => {
    if (data) {
      setMintCost(BigNumber.from(data));
    }
  }, [data]);

  return { mintCost, isError };
};

export default useMintCost;
