import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "../domain/Domain";

const abi = [
  {
    inputs: [],
    name: "maxSupply",
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

const useMaxSupply = ({
  contractAddress,
  enabled,
}: {
  contractAddress: Address;
  enabled?: boolean | undefined;
}) => {
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "maxSupply",
    enabled: enabled != undefined ? enabled : true,
  });

  const [maxSupply, setMaxSupply] = useState(BigNumber.from(0));

  useEffect(() => {
    if (data) {
      setMaxSupply(BigNumber.from(data));
    }
  }, [data]);

  return { maxSupply, isError };
};

export default useMaxSupply;
