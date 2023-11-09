import { ethers } from "hardhat";
const hre = require("hardhat");
const fs = require("fs");

const deployments = hre.deployments;

async function main() {
  const ChainellationDeployment = await deployments.get("Chainellation");

  const contract = await hre.ethers.getContractAt(
    "Chainellation",
    ChainellationDeployment.address
  );
  console.log("connected");

  for (let i = 1; i <= 500; i++) {
    let svg = await contract.generateSVG(i, 32, 900);
    let filename = "./gen/" + "/" + i + ".svg";
    await fs.writeFileSync(filename, svg);
    console.log("generated: " + i + "/5");
  }

  // let tx = await contract.mint();
  // await tx;

  // tx = await contract.mint();
  // await tx;
  // console.log("done, minte 2");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
