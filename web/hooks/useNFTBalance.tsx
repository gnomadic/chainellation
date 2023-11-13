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
    ],
    name: "balanceOf",
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

const useNFTBalance = ({
  contractAddress,
  walletAddress,
  enabled,
}: {
  contractAddress: Address;
  walletAddress: Address;
  enabled?: boolean | undefined;
}) => {
  const {
    data: balance,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "balanceOf",
    args: [walletAddress],
    enabled: contractAddress != "0x0" && enabled != undefined ? enabled : true,
  });

  const [NFTBalance, setNFTBalance] = useState(0);

  useEffect(() => {
    if (balance) {
      console.log(
        "useNFTBalance: " +
          balance +
          " from: " +
          contractAddress +
          " for: " +
          walletAddress
      );
      setNFTBalance(BigNumber.from(balance).toNumber());
    }
  }, [balance]);

  return { NFTBalance, isBalanceError };
};

export default useNFTBalance;
