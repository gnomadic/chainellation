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
  replaceGradients,
} from "../../utils/svgcombiner";
import Switch from "react-switch";
import sunIcon from "../../images/social/sun.svg";
import moonIcon from "../../images/social/moon.svg";
import ClientOnly from "../ClientOnly";
import Circle from "@uiw/react-color-circle";
import { element } from "@rainbow-me/rainbowkit/dist/css/reset.css";

type MintColorPickerProps = {
  changeComplete: (primaryHue: any, secondaryHue: any) => void;
};

export default function MintColorPicker(props: MintColorPickerProps) {



    
  const resetFirstColor = function () {
    // setHsva1({ h: originalColors.first, s: 100, v: 30, a: 1 });
    props.changeComplete(
      { h: originalColors.first, s: 100, v: 30, a: 1 },
      null
    );
  };

  const resetSecondColor = function () {
    // setHsva2({ h: originalColors.second, s: 100, v: 30, a: 1 });
    props.changeComplete(null, {
      h: originalColors.second,
      s: 100,
      v: 30,
      a: 1,
    });
  };

  return (
    <section id="colors">
      <p className="py-2 font-kdam">Primary Color</p>
      <div className="flex mx-auto max-w-[512px] ">
        <div
          className=" border-boldorange border-[2px] mr-4"
          onClick={() => {
            resetFirstColor();
          }}
        >
          <Image width={40} height={40} src={iconrefresh} alt="logo" />
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
      <p className="pb-2 pt-6 font-kdam">Secondary Color</p>
      <div className="flex mx-auto max-w-[512px]">
        <div
          className=" border-boldorange border-[2px] mr-4"
          onClick={() => {
            resetSecondColor();
          }}
        >
          <Image width={40} height={40} src={iconrefresh} alt="logo" />
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
    </section>
  );
}
