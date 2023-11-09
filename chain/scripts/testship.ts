import { ethers } from "hardhat";
import { BigNumber } from "ethers";

const hre = require("hardhat");

const deployments = hre.deployments;

async function main() {
  const ChainellationDeployment = await deployments.get("Chainellation");

  const chainellation = await hre.ethers.getContractAt(
    "Chainellation",
    ChainellationDeployment.address
  );

  const DecorationsDeployment = await deployments.get("Decorations");
  const decorations = await hre.ethers.getContractAt(
    "Decorations",
    DecorationsDeployment.address
  );

  const EmptySKymathDeployment = await deployments.get("Empty_SkyMath");
  const skymath = await hre.ethers.getContractAt(
    "Empty_SkyMath",
    EmptySKymathDeployment.address
  );
  console.log("connected");

  // let all = await decorations.getAllDecorations();
  // console.log(JSON.stringify(all, null, 2));
  // let available = await decorations.getAvailableDecorations(
  //   "0x0a12A6777fc7D65b1461070648dA9CAE6962fcEe"
  // );
  // console.log(JSON.stringify(available[0], null, 2));

  // let skymathbalance = await skymath.balanceOf(
  //   "0x0a12A6777fc7D65b1461070648dA9CAE6962fcEe"
  // );
  // console.log("skymathbalance: ", skymathbalance);

  let setOne = await decorations.setDecoration(
    1,
    2,
    "0xA9657A1514345A24CE3535C7EbA39E8001EBA1ED",
    1
  );
  await setOne.wait();

  // let setBatch = await decorations.setDecorationBatch(
  //   1,
  //   [1, 2],
  //   [
  //     "0x3169Bc40FB73A9EA1574f34CeCdDf4e51Da6027d",
  //     "0xA9657A1514345A24CE3535C7EbA39E8001EBA1ED",
  //   ],
  //   [1, 1]
  // );
  // await setBatch.wait();

  // all.forEach(async (dec) => {
  //   console.log(dec);
  //   let unreg = await decorations.unregister(dec);
  //   await unreg.wait();
  // });

  // let unreg = decorations.unregister(
  //   "0x3294579a4f590e8E8a9b289ab35E3A3914C34d65"
  // );

  // let svg = await chainellation.generateSVG(1, 5, 0, false);
  // console.log("---------------------");
  // console.log(svg);
  // console.log("---------------------");

  // var meta = await contract.tokenURI(1);
  // console.log(meta);
  // for (let i = 0; i < 18; i++) {
  //   console.log("minting: ", i);
  //   var mint = await contract.freeMint(BigNumber.from("72000"));
  //   await mint.wait();
  //   console.log("done: ", i);
  // }

  // var curSupply = await contract.currentSupply();
  // console.log("curSupply: ", curSupply);

  // let tx = await contract.setCustomizeCost(BigNumber.from("0"));
  // await tx.wait();

  // var balance = await contract.balanceOf(
  //   "0x0a12A6777fc7D65b1461070648dA9CAE6962fcEe"
  // );
  // console.log("balance: ", balance);

  // var gazes = await contract.gazes(1);
  // console.log("gazes: ", gazes);

  // var gazesub = await contract.gazeSubGusts(1);
  // console.log("gazesub: ", gazesub);

  // var daysSince = await contract.daysSinceLastGust(1);
  // console.log("daysSince: ", daysSince);

  // var stargaze = await contract.starGaze(1);
  // await stargaze.wait();

  // var tx = await contract.withdraw();
  // await tx.wait();

  // var gazes = await contract.gazes(1);
  // console.log("gazes: ", gazes);

  // var gazesub = await contract.gazeSubGusts(1);
  // console.log("gazesub: ", gazesub);

  // var curTime = await contract.isNight(1);
  // console.log(curTime);
  console.log("done");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
