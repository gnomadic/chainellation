import { ethers } from "hardhat";
const hre = require("hardhat");

const deployments = hre.deployments;

async function main() {
  const ChainellationDeployment = await deployments.get("Chainellation");

  const contract = await hre.ethers.getContractAt(
    "Chainellation",
    ChainellationDeployment.address
  );
  console.log("connected");

  let tx = await contract.mint();
  await tx;

  tx = await contract.mint();
  await tx;
  console.log("done, minted 2");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
