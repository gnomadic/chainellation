import Image from "next/future/image";
import { useContractRead, usePrepareContractWrite } from "wagmi";
import { Deployment } from "../../domain/Domain";
import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { waitForTransaction, writeContract } from "@wagmi/core";
import abi from "../../abi/Chainellation.json";
import useMaxSupply from "../../hooks/useMaxSupply";
import useMintCost from "../../hooks/useMintCost";
import Hue from "@uiw/react-color-hue";
import Slider from "@uiw/react-color-slider";
import {
  extractFirstColor,
  extractSecondColor,
  replaceGradients,
} from "../../utils/svgcombiner";
import Switch from "react-switch";
import iconrefresh from "../../images/social/icon-refresh.svg";

import ClientOnly from "../ClientOnly";
import Circle from "@uiw/react-color-circle";
import { element } from "@rainbow-me/rainbowkit/dist/css/reset.css";

type MintConstellationPickerProps = {
  // changeComplete: (primaryHue: any, secondaryHue: any) => void;
  // setPreview: (svg: string) => void;
  selected: number;
  setSelected: (index: number) => void;
};

type Constellation = {
  stars: string;
  color: string;
  index: number;
};

export default function MintConstellationPicker(
  props: MintConstellationPickerProps
) {
  const random = { stars: "Random", color: "#b5b5b5", index: 0 };

  const [constellation, setConstellation] = useState<Constellation>(random);
  const [hex, setHex] = useState("#F44E3B");

  const availableConstellations = [
    { stars: "Aries", color: "#ff0800", index: 1 },
    { stars: "Sagittarius", color: "#6600ff", index: 2 },
    { stars: "Capricorn", color: "#6a6a6f", index: 3 },
    { stars: "Aquarius", color: "#c4f4eb", index: 4 },
    { stars: "Pisces", color: "#8d5eb7", index: 5 },
    { stars: "Scorpio", color: "#800020", index: 6 },
    { stars: "Libra", color: "#f62681", index: 7 },
    { stars: "Virgo", color: "#f8a39d", index: 8 },
    { stars: "Leo", color: "#ffdf01", index: 9 },
    { stars: "Cancer", color: "#14a3c7", index: 10 },
    { stars: "Gemini", color: "#ff9932", index: 11 },
    { stars: "Taurus", color: "#05480d", index: 12 },
    { stars: "Pegasus", color: "#ffffff", index: 13 },
    { stars: "Ursa Minor", color: "#808080", index: 14 },
    { stars: "Cygnus", color: "#000000", index: 15 },
  ];

  const resetConstellation = function () {
    updateConstellation(random);
  };

  const updateConstellation = function (selected: Constellation) {
    setConstellation(selected);
    props.setSelected(selected.index);
  };

  //-----

  return (
    <section id="constellation-picker">
      <div className="flex ">
        <p className="pt-6 pb-2 basis-1/2 font-kdam ">Constellation</p>
        <p className="pt-6 pb-2 text-base text-right basis-1/2 font-kdam">
          0.005 eth
        </p>
      </div>
      <div className="mx-5 ">
        <p className="py-2 font-roboto text-cream">{constellation?.stars}</p>
        <div className="flex mx-auto max-w-[512px] ">
          <div
            className=" border-boldorange border-[2px] mr-4 min-w-[44px] max-h-[44px]"
            onClick={() => {
              resetConstellation();
            }}
          >
            <Image width={40} height={40} src={iconrefresh} alt="logo" />
          </div>

          <div className="flex-auto p-3 border-boldorange border-[2px] mx-auto">
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
                updateConstellation(selected!);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
