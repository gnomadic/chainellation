import Image from "next/future/image";
import placeholder from "../../images/cardback.png";
import { useContractRead, usePrepareContractWrite } from "wagmi";
import { Deployment } from "../../domain/Domain";
import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { waitForTransaction, writeContract } from "@wagmi/core";
import abi from "../../abi/Chainellation.json";
import useMaxSupply from "../../hooks/useMaxSupply";
import useMintCost from "../../hooks/useMintCost";
import Hue from "@uiw/react-color-hue";
import iconrefresh from "../../images/social/icon-refresh.svg";
import Slider from "@uiw/react-color-slider";
import {
  extractFirstColor,
  extractSecondColor,
  replaceClouds,
  replaceGradients,
} from "../../utils/svgcombiner";
import Switch from "react-switch";
import sunIcon from "../../images/social/sun.svg";
import moonIcon from "../../images/social/moon.svg";
import Circle from "@uiw/react-color-circle";
// import MintColorPicker from "./MintColorPicker";

type MintProps = {
  deploy: Deployment;
};

export default function NightSkyMint(props: MintProps) {
  const [tzOffset, setTzOffset] = useState<number>(0);
  const [timeZone, setTimeZone] = useState<string>("");
  const [hsva, setHsva] = useState({
    primary: { h: 0, s: 100, v: 30, a: 1 },
    secondary: { h: 0, s: 100, v: 30, a: 1 },
  });
  const [originalColors, setOriginalColors] = useState({
    first: -1,
    second: -1,
  });
  const [isDay, setIsDay] = useState(false);
  const [isGazed, setIsGazed] = useState(false);

  type Constellation = {
    stars: string;
    color: string;
  };

  const [constellation, setConstellation] = useState<Constellation>({
    stars: "Random",
    color: "#b5b5b5",
  });
  const [hex, setHex] = useState("#F44E3B");

  const availableConstellations = [
    { stars: "Random", color: "#b5b5b5" },
    { stars: "Aries", color: "#ff0800" },
    { stars: "Sagittarius", color: "#6600ff" },
    { stars: "Capricorn", color: "#6a6a6f" },
    { stars: "Aquarius", color: "#c4f4eb" },
    { stars: "Pisces", color: "#8d5eb7" },
    { stars: "Scorpio", color: "#800020" },
    { stars: "Libra", color: "#f62681" },
    { stars: "Virgo", color: "#f8a39d" },
    { stars: "Leo", color: "#ffdf01" },
    { stars: "Cancer", color: "#14a3c7" },
    { stars: "Gemini", color: "#ff9932" },
    { stars: "Taurus", color: "#05480d" },
    { stars: "Pegasus", color: "#ffffff" },
    { stars: "Ursa Minor", color: "#808080" },
    { stars: "Cygnus", color: "#000000" },
  ];

  const availableClouds = [
    { r: 179, density: 1 },
    { r: 121, density: 2 },
    { r: 64, density: 3 },
    { r: 45, density: 4 },
    { r: 26, density: 5 },
  ];

  const [cloudSwitch, setCloudSwitch] = useState({ h: 197, s: 3, v: 88, a: 1 });
  const [clouds, setClouds] = useState(179);

  // {"r":230,"g":179,"b":179}
  const [preview, setPreview] = useState("");

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
      // 0,
      isGazed ? 40 : 0,
      0,
      isDay,
    ],
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("got image");

      setPreview(window.btoa(String(data)));
    },
    // select: (data) => setPreview(window.btoa(String(data))),
  });

  useEffect(() => {
    if (preview == "") {
      return;
    }
    if (originalColors.first == -1) {
      const image = window.atob(preview);
      console.log("first load");
      const color1 = extractFirstColor(String(image));
      const color2 = extractSecondColor(String(image));

      setHsva({
        primary: { h: Number(color1), s: 100, v: 30, a: 1 },
        secondary: { h: Number(color2), s: 100, v: 30, a: 1 },
      });

      setOriginalColors({ first: Number(color1), second: Number(color2) });
    } else {
      console.log("toggle it");
      let primaryh = hsva.primary.h;
      let secondaryh = hsva.secondary.h;

      changeComplete(
        { h: primaryh, s: 100, v: 30, a: 1 },
        {
          h: secondaryh,
          s: 100,
          v: 30,
          a: 1,
        }
      );
    }
  }, [preview]);

  const resetFirstColor = function () {
    // setHsva1({ h: originalColors.first, s: 100, v: 30, a: 1 });
    changeComplete({ h: originalColors.first, s: 100, v: 30, a: 1 }, null);
  };

  const resetSecondColor = function () {
    // setHsva2({ h: originalColors.second, s: 100, v: 30, a: 1 });
    changeComplete(null, { h: originalColors.second, s: 100, v: 30, a: 1 });
  };

  // const [contractMintCost, setContractMintCost] = useState(BigNumber.from(0));
  const { config, error } = usePrepareContractWrite({
    address: props.deploy.chainellationAddress,
    abi: abi.abi,
    functionName: "mintCustom",
    args: [tzOffset, Math.trunc(hsva.primary.h), Math.trunc(hsva.secondary.h)],
    value: mintCost.toBigInt(),
  });

  const changeComplete = function (primaryHue: any, secondaryHue: any) {
    let updated = preview;
    let primary = hsva.primary;
    let secondary = hsva.secondary;

    if (primaryHue) {
      // updated = replaceGradientOne(preview, primaryHue.h);
      primary = primaryHue;
    }

    if (secondaryHue) {
      // updated = replaceGradientTwo(preview, secondaryHue.h);
      secondary = secondaryHue;
    }

    updated = replaceGradients(preview, primary.h, secondary.h);

    // const n = replaceGradientOne(preview, newHue.h);
    setHsva({ primary: primary, secondary: secondary });
    setPreview(window.btoa(updated));
  };

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

  useEffect(() => {
    if (preview == "") {
      return;
    }
    console.log("clouds: " + clouds);
    let updated = preview;

    let cloudLevel = availableClouds.find((element) => {
      return element.r === clouds;
    })?.density;
    console.log("cloud level: " + cloudLevel);

    updated = replaceClouds(preview, cloudLevel!);

    setPreview(window.btoa(updated));
  }, [clouds, preview]);

  return (
    <section className=" z-10 relative">
      <div className="relative z-10 bg-clearslate font-roboto md:py-16">
        <section className="text-offwhite text-xl md:px-36">
          <div className="text-2xl md:text-6xl font-normal uppercase leading-normal text-center text-offwhite font-kdam ">
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
            {/* <div className="p-4 text-xl text-offwhite border-boldorange border-[2px] rounded-lg max-w-[512px]"> */}
            <section id="colors">
              <div className="flex ">
                <p className="basis-1/2 pb-2 font-kdam ">Colors</p>
                <p className="basis-1/2 pb-2 text-base font-kdam text-right">
                  0.005 eth
                </p>
              </div>
              <div className="mx-5">
                <p className="py-2">Primary Color</p>
                <div className="flex mx-auto max-w-[512px] ">
                  <div
                    className=" border-boldorange border-[2px] mr-4"
                    onClick={() => {
                      resetFirstColor();
                    }}
                  >
                    <Image
                      width={40}
                      height={40}
                      src={iconrefresh}
                      alt="logo"
                    />
                  </div>

                  <div className="flex-auto p-3 border-boldorange border-[2px] mx-auto">
                    <Hue
                      hue={hsva.primary.h}
                      onChange={(newHue) => {
                        changeComplete(newHue, null);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mx-5">
                <p className="pb-2 pt-6">Secondary Color</p>
                <div className="flex mx-auto max-w-[512px]">
                  <div
                    className=" border-boldorange border-[2px] mr-4"
                    onClick={() => {
                      resetSecondColor();
                    }}
                  >
                    <Image
                      width={40}
                      height={40}
                      src={iconrefresh}
                      alt="logo"
                    />
                  </div>

                  <div className="flex-auto  p-3 border-boldorange border-[2px] mx-auto">
                    <Hue
                      hue={hsva.secondary.h}
                      onChange={(newHue) => {
                        changeComplete(null, newHue);
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section id="constellation">
              <div className="flex ">
                <p className="basis-1/2 pb-2 pt-6 font-kdam ">Constellation</p>
                <p className="basis-1/2 pb-2 pt-6 text-base font-kdam text-right">
                  0.005 eth
                </p>
              </div>
              <div className=" max-w-[512px] mx-5">
                <div className="border-boldorange border-[2px] p-4 ">
                  {/* <div className="flex mx-auto max-w-[512px] border-boldorange border-[2px] p-4 "> */}
                  <Circle
                    colors={availableConstellations.map((current, index) => {
                      return current.color;
                    }, [])}
                    color={hex}
                    onChange={(color: any) => {
                      setHex(color.hex);
                      let selected = availableConstellations.find((element) => {
                        return element.color === color.hex;
                      });
                      setConstellation(selected!);
                    }}
                  />
                </div>

                <div className="  p-3 border-boldorange border-[2px] mx-auto mt-4">
                  {/* <div className="flex-auto  p-3 border-boldorange border-[2px] mx-auto"> */}
                  <p>{constellation?.stars}</p>
                </div>
              </div>

              <div className="flex ">
                <p className="basis-1/2 pb-2 pt-6 font-kdam ">Clouds</p>
                <p className="basis-1/2 pb-2 pt-6 text-base font-kdam text-right">
                  0.005 eth
                </p>
              </div>
              <div className="flex mx-auto max-w-[512px] mx-5">
                <div className="flex-auto p-3 border-boldorange border-[2px] mx-auto">
                  <Slider
                    color={cloudSwitch}
                    onChange={(color: any) => {
                      setCloudSwitch({ ...cloudSwitch, ...color.hsv });
                      setClouds(color.rgb.r);
                      console.log("clouds: " + JSON.stringify(cloudSwitch));
                    }}
                  />
                </div>
              </div>
            </section>

            <button
              className="mx-auto border-boldorange border-[2px] mt-8 px-8 py-3 bg-boldred min-w-[512px]"
              onClick={async () => {
                // write?.();
                try {
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
                  console.log("insufficient funds");
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
