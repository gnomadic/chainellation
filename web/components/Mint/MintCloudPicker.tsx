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
  replaceClouds,
  replaceGradients,
} from "../../utils/svgcombiner";
import Switch from "react-switch";

import ClientOnly from "../ClientOnly";
import Circle from "@uiw/react-color-circle";
import { element } from "@rainbow-me/rainbowkit/dist/css/reset.css";

type MintCloudPickerProps = {
  // changeComplete: (primaryHue: any, secondaryHue: any) => void;
  setPreview: (svg: string) => void;
  preview: string;
};

const availableClouds = [
  { r: 179, density: 1 },
  { r: 121, density: 2 },
  { r: 64, density: 3 },
  { r: 45, density: 4 },
  { r: 26, density: 5 },
];

export default function MintCloudPicker(props: MintCloudPickerProps) {
  const [cloudSwitch, setCloudSwitch] = useState({ h: 197, s: 3, v: 88, a: 1 });
  const [clouds, setClouds] = useState(179);

  useEffect(() => {
    if (props.preview == "") {
      return;
    }

    if (clouds == cloudSwitch.h) {
      return;
    }
    console.log("clouds: " + clouds);
    let updated = props.preview;

    let cloudLevel = availableClouds.find((element) => {
      return element.r === clouds;
    })?.density;
    console.log("cloud level: " + cloudLevel);

    updated = replaceClouds(props.preview, cloudLevel!);

    props.setPreview(window.btoa(updated));
  }, [clouds, props, cloudSwitch]);

  //-----

  return (
    <section id="cloud-picker">
      <div className="flex ">
        <p className="pt-6 pb-2 basis-1/2 font-kdam ">Clouds</p>
        <p className="pt-6 pb-2 text-base text-right basis-1/2 font-kdam">
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
  );
}
