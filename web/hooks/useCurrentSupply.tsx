import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "../domain/Domain";

const abi = [
  {
    inputs: [],
    name: "currentSupply",
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

const useCurrentSupply = ({
  contractAddress,
  enabled,
}: {
  contractAddress: Address;
  enabled?: boolean | undefined;
}) => {
  const {
    data: supply,
    isError: isCurSupplyError,
    isLoading: isCurSupplyLoading,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "currentSupply",
    enabled: enabled != undefined ? enabled : true,
  });

  const [curSupply, setCurSupply] = useState(BigNumber.from(0));

  useEffect(() => {
    if (supply) {
      setCurSupply(BigNumber.from(supply));
    }
  }, [supply]);

  return { curSupply, isCurSupplyError };
};

export default useCurrentSupply;
