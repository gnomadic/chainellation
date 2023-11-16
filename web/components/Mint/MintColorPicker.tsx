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
import Hue from "@uiw/react-color-hue";
import iconrefresh from "../../images/social/icon-refresh.svg";
import Slider from "@uiw/react-color-slider";
import {
  extractFirstColor,
  extractSecondColor,
  replaceGradients,
} from "../../utils/svgcombiner";

type MintColorPickerProps = {
  preview: string;
  colorChoice: ColorSet;
  setPreview: (svg: string) => void;
  setColorChoice: ({ primary, secondary }: ColorSet) => void;
  originalColors: ColorSet;
  setOriginalColors: ({ primary, secondary }: ColorSet) => void;
};

export default function MintColorPicker(props: MintColorPickerProps) {
  // const [originalColors, setOriginalColors] = useState({
  //   first: -1,
  //   second: -1,
  // });

  const [hsva, setHsva] = useState({
    primary: { h: 0, s: 100, v: 30, a: 1 },
    secondary: { h: 0, s: 100, v: 30, a: 1 },
  });

  const resetFirstColor = function () {
    // setHsva1({ h: originalColors.first, s: 100, v: 30, a: 1 });
    changeComplete(
      { h: props.originalColors.primary, s: 100, v: 30, a: 1 },
      null
    );
  };

  const resetSecondColor = function () {
    // setHsva2({ h: originalColors.second, s: 100, v: 30, a: 1 });
    changeComplete(null, {
      h: props.originalColors.secondary,
      s: 100,
      v: 30,
      a: 1,
    });
  };

  const changeComplete = function (primaryHue: any, secondaryHue: any) {
    let updated = props.preview;
    let primary = hsva.primary;
    let secondary = hsva.secondary;

    if (primaryHue) {
      primary = primaryHue;
    }

    if (secondaryHue) {
      secondary = secondaryHue;
    }

    console.log("MintColorPicker: change complete, replacing gradients");
    updated = replaceGradients(props.preview, primary.h, secondary.h);

    setHsva({ primary: primary, secondary: secondary });
    props.setColorChoice({
      primary: primary.h,
      secondary: secondary.h,
    });
    props.setPreview(window.btoa(updated));
  };

  useEffect(() => {
    console.log("MintColorPicker: useEffect");
    if (props.preview == "") {
      return;
    }
    if (props.colorChoice.primary == hsva.primary.h) {
      return;
    }
    if (props.colorChoice.secondary == hsva.secondary.h) {
      return;
    }
    if (props.originalColors.primary == -1) {
      console.log("MintColorPicker, first load so extracting colors");
      const image = window.atob(props.preview);
      const color1 = extractFirstColor(String(image));
      const color2 = extractSecondColor(String(image));

      setHsva({
        primary: { h: Number(color1), s: 100, v: 30, a: 1 },
        secondary: { h: Number(color2), s: 100, v: 30, a: 1 },
      });
      props.setColorChoice({
        primary: Number(color1),
        secondary: Number(color2),
      });

      props.setOriginalColors({
        primary: Number(color1),
        secondary: Number(color2),
      });
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
  }, [props]);

  return (
    <section id="colors">
      <div className="flex ">
        <p className="pb-2 basis-1/2 font-kdam ">Colors</p>
        <p className="pb-2 text-base text-right basis-1/2 font-kdam">
          0.005 eth
        </p>
      </div>
      <div className="mx-5 ">
        <p className="py-2 font-roboto text-cream">Primary Color</p>
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
        <p className="pt-6 pb-2 font-roboto text-cream">Secondary Color</p>
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
      </div>
    </section>
  );
}
