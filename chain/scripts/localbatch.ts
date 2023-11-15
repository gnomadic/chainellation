import { ethers } from "hardhat";
import { getContract } from "../test/testutils";
const hre = require("hardhat");
const fs = require("fs");

const deployments = hre.deployments;

async function main() {
  await deployments.fixture(["nightsky"]);

  let contract = await getContract("Chainellation");
  console.log("connected");

  const amount_to_generate = 20;

  for (let i = 0; i <= amount_to_generate; i++) {
    let svg = await contract.generateSVG(i, 10, false);
    let filename = "./gen/" + i + ".svg";
    await fs.writeFileSync(filename, svg);
    console.log("generated: " + i + "/" + amount_to_generate);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
