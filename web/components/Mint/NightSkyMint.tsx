import Image from "next/future/image";
import placeholder from "../../images/cardback.png";
import { useContractRead, usePrepareContractWrite } from "wagmi";
import { ColorSet, Deployment } from "../../domain/Domain";
import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { waitForTransaction, writeContract } from "@wagmi/core";
import abi from "../../abi/Chainellation.json";
import useMaxSupply from "../../hooks/useMaxSupply";
import useMintCost from "../../hooks/useMintCost";
import Switch from "react-switch";
import sunIcon from "../../images/social/sun.svg";
import moonIcon from "../../images/social/moon.svg";
import MintConstellationPicker from "./MintConstellationPicker";
import MintCloudPicker from "./MintCloudPicker";
import MintColorPicker from "./MintColorPicker";

type MintProps = {
  deploy: Deployment;
};

export default function NightSkyMint(props: MintProps) {
  const [tzOffset, setTzOffset] = useState<number>(0);
  const [timeZone, setTimeZone] = useState<string>("");

  const [isDay, setIsDay] = useState(false);
  const [isGazed, setIsGazed] = useState(false);

  const [preview, setPreview] = useState("");

  const [originalColors, setOriginalColors] = useState<ColorSet>({
    primary: -1,
    secondary: -1,
  });

  const [clouds, setClouds] = useState(0);
  const [constellation, setConstellation] = useState(0);

  const {
    data: currentSupply,
    isError: isSupplyError,
    isLoading: isSupplyLoading,
    refetch: refetchSupply,
  } = useContractRead({
    address: props.deploy.chainellationAddress,
    abi: abi.abi,
    functionName: "currentSupply",
    enabled: props.deploy.chainellationAddress !== "0x0",
    onError: (error: Error) => {
      console.log("error: " + error);
    },
  });

  const { maxSupply: totalSupply, isError: isTotalSupplyError } = useMaxSupply({
    contractAddress: props.deploy.chainellationAddress,
    enabled: props.deploy.chainellationAddress !== "0x0",
  });

  const { mintCost, isError: isMintCostError } = useMintCost({
    contractAddress: props.deploy.chainellationAddress,
    enabled: props.deploy.chainellationAddress !== "0x0",
  });

  const {
    data: image,
    isError: isImageError,
    isLoading: isImageLoading,
    refetch: refetchImage,
  } = useContractRead({
    address: props.deploy.chainellationAddress,
    abi: abi.abi,
    functionName: "generateSVG",
    enabled:
      props.deploy.chainellationAddress !== "0x0" &&
      currentSupply !== undefined,
    args: [
      currentSupply ? BigNumber.from(currentSupply).toNumber() + 1 : 0,
      isGazed ? 51 : 0,
      isDay,
      constellation, // TODO test constellation
    ],
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("got image");
      console.log(data);
      setColorChoice({ primary: 100, secondary: 100 });

      setPreview(window.btoa(String(data)));
    },
  });

  const [mintReady, setMintReady] = useState(false);
  // const [contractMintCost, setContractMintCost] = useState(BigNumber.from(0));
  const [colorChoice, setColorChoice] = useState({
    primary: 100,
    secondary: 100,
  });
  const { config, error } = usePrepareContractWrite({
    address: props.deploy.chainellationAddress,
    abi: abi.abi,
    functionName: "mintCustom",
    args: [
      tzOffset,
      colorChoice.primary == originalColors.primary
        ? 370
        : Math.trunc(colorChoice.primary),
      // ).Math.trunc(colorChoice.primary), //default to 370 if nothing is selected
      colorChoice.secondary == originalColors.secondary
        ? 370
        : Math.trunc(colorChoice.secondary),
      // Math.trunc(colorChoice.secondary),
      constellation, //constellation
      clouds, // clouds
    ],
    enabled: mintReady,
    value: mintCost.toBigInt(),
  });

  const dayNightToggle = function (toggled: any) {
    console.log("toggled: ", toggled);
    setIsDay(!isDay);
  };

  const gazedToggle = function (toggled: any) {
    console.log("toggled gazes: ", toggled);
    setIsGazed(!isGazed);
  };

  useEffect(() => {
    console.log("mounted");

    var offset = new Date().getTimezoneOffset() / 60;
    if (offset < 0) {
      offset = offset + 24;
    }

    setTimeZone(
      Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone.replace("/", " / ")
        .replace("_", " ")
    );
    let minutesOffset = new Date().getTimezoneOffset();
    console.log("inital minutesOffset: " + minutesOffset);
    // invert it because the UTC standard doesn't make much of any sense.
    minutesOffset = minutesOffset * -1;
    // this is a bit hacky but I don't want to deal wiht negative numbers
    // if the offset is negative, add 24 hours to it so it's in the future sure, but same time.
    if (minutesOffset < 0) {
      minutesOffset = minutesOffset + 24 * 60;
    }

    console.log("minutesOffset: " + minutesOffset);
    setTzOffset(minutesOffset * 60);
  }, []);

  return (
    <section className="relative z-10 ">
      <div className="relative z-10 bg-clearslate font-roboto md:py-16">
        <section className="text-xl text-offwhite md:px-36">
          <div className="text-2xl font-normal leading-normal text-center uppercase md:text-6xl text-offwhite font-kdam ">
            Mint your night sky
          </div>
          <div className="w-20 mx-auto mt-8 h-[0px] border-2 border-boldorange"></div>
        </section>

        <div className="grid grid-cols-1 gap-8 pt-12 md:grid-cols-2 md:pt-20">
          <div className="mx-4 ">
            <div className="border-boldorange border-[2px] rounded-lg max-w-[512px] mx-auto">
              <Image
                alt="minting"
                src={
                  isImageLoading || preview == ""
                    ? placeholder
                    : "data:image/svg+xml;base64," + preview
                }
                className="mx-auto rounded-lg shadow-2xl"
                width={512}
                height={512}
              />
            </div>
            <div className="flex pt-6 text-cream">
              <div className="mx-auto">
                {currentSupply && totalSupply ? (
                  <div className="text-l">
                    {BigNumber.from(currentSupply)?.toNumber()} /{" "}
                    {BigNumber.from(totalSupply)?.toNumber()}
                  </div>
                ) : (
                  <div className="text-l">-/-</div>
                )}
              </div>
              {mintCost ? (
                <div className="mx-auto">
                  {/* {ethers.utils.formatEther(BigNumber.from(mintCost))}{" "}
                  {props.deploy.currency} */}
                  {timeZone}
                </div>
              ) : (
                <div className="mx-auto">
                  {"Loading "}
                  {props.deploy.currency}
                </div>
              )}
              <div className="mx-auto ">
                <Switch
                  className="mr-4"
                  onChange={gazedToggle}
                  checked={isGazed}
                  onColor="#EA8F21"
                  uncheckedIcon={
                    <Image
                      className="pt-1 ml-1"
                      src={moonIcon}
                      alt={"night"}
                      width={20}
                      height={20}
                    />
                  }
                  checkedIcon={
                    <Image
                      className="pt-1 ml-1"
                      src={sunIcon}
                      alt={"night"}
                      width={20}
                      height={20}
                    />
                  }
                />
                <Switch
                  onChange={dayNightToggle}
                  checked={isDay}
                  onColor="#EA8F21"
                  uncheckedIcon={
                    <Image
                      className="pt-1 ml-1"
                      src={moonIcon}
                      alt={"night"}
                      width={20}
                      height={20}
                    />
                  }
                  checkedIcon={
                    <Image
                      className="pt-1 ml-1"
                      src={sunIcon}
                      alt={"night"}
                      width={20}
                      height={20}
                    />
                  }
                />
              </div>
            </div>
          </div>
          <div className="mx-4 text-xl text-offwhite max-w-[512px]">
            <MintColorPicker
              preview={preview}
              colorChoice={colorChoice}
              setPreview={setPreview}
              setColorChoice={setColorChoice}
              originalColors={originalColors}
              setOriginalColors={setOriginalColors}
            />
            <MintConstellationPicker
              selected={constellation}
              setSelected={setConstellation}
            />
            <MintCloudPicker
              preview={preview}
              setPreview={setPreview}
              clouds={clouds}
              setClouds={setClouds}
            />

            <button
              className="mx-auto border-boldorange border-[2px] mt-8 px-8 py-3 bg-boldred min-w-full"
              onClick={async () => {
                // write?.();
                try {
                  setMintReady(true);
                  const { hash } = await writeContract(config);
                  // console.log("hash: " + hash);
                  const data = await waitForTransaction({
                    confirmations: 1,
                    hash,
                  });
                  // console.log("data: " + data);
                  refetchSupply();
                  refetchImage();
                  console.log("refetched");
                } catch (e) {
                  console.log("errorx: " + e);
                }
              }}
            >
              mint
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
