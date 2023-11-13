import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "../domain/Domain";
import { json } from "stream/consumers";

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getAvailableDecorations",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
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

const useAvailableDeco = ({
  contractAddress,
  walletAddress,
}: {
  contractAddress: Address;
  walletAddress: Address;
}) => {
  const {
    data: decorations,
    isError: isDecosError,
    isLoading: isDecosLoading,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAvailableDecorations",
    args: [walletAddress],
  });

  const [decos, setDecos] = useState([] as string[]);
  const [decoIds, setDecoIds] = useState([] as number[]);

  useEffect(() => {
    // console.log("decorations: " + decorations);
    // console.log("error: " + isDecosError);
    if (decorations) {
      console.log("use available deco: ", decorations);
      let addresses: string[] = [];
      let ids: number[] = [];

      // let keys = Object.keys(decorations);
      // keys.forEach((element) => {
      //   result.push(decorations[element as keyof {}]);
      // });

      // setDecos(result);
      // console.log(Object.keys(decorations));
      // console.log(decorations[0 as keyof {}]);
      // console.log(decorations[1 as keyof {}]);
      (decorations[0 as keyof {}] as string[]).forEach((element) => {
        if (element != "0x0000000000000000000000000000000000000000") {
          addresses.push(element);
        }
      });
      (decorations[1 as keyof {}] as BigNumber[]).forEach((element) => {
        console.log("ok: ", element);
        // let num = Number(element.substring(0, element.length - 1));
        let str = element.toString();
        console.log("ok as string: ", str);
        let num = Number(str);

        if (num != 0) {
          ids.push(num);
        }
      });

      // decorations.map((deco) => {
      //   console.log(deco);
      // });
      // console.log("id length: ", ids.length);

      setDecos(addresses);
      setDecoIds(ids);
      // console.log("id length: ", ids.length);
    }
  }, [decorations]);

  return { decos, decoIds, isDecosError };
};

export default useAvailableDeco;
