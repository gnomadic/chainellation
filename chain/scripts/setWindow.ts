import { ethers } from "hardhat";
import { getContract } from "../test/testutils";
const hre = require("hardhat");
const fs = require("fs");

const deployments = hre.deployments;

async function main() {
  await deployments.fixture(["nightsky"]);

  let contract = await getContract("Chainellation");

  let decorations = await getContract("Decorations");
  let window = await getContract("Window");
  let ufo = await getContract("UFO");

  let mintprice = await contract.mintCost();
  let mint = await contract.mint("0", { value: mintprice });
  await mint.wait();

  mintprice = await window.mintCost();
  mint = await window.mint({ value: mintprice });
  await mint.wait();

  mintprice = await ufo.mintCost();
  mint = await ufo.mint({ value: mintprice });
  await mint.wait();

  console.log("minted");

  let register = await decorations.register(window.address, 1);
  await register.wait();
  register = await decorations.register(ufo.address, 3);
  await register.wait();
  console.log("registered");

  let approve = await window.approve(decorations.address, 1);
  await approve.wait();
  approve = await ufo.approve(decorations.address, 1);
  await approve.wait();
  console.log("approved");

  let set = await decorations.setDecoration(1, 1, window.address, 1);
  await set.wait();
  set = await decorations.setDecoration(1, 3, ufo.address, 1);
  await set.wait();
  console.log("connected");

  let meta = await contract.tokenURI(1);
  console.log(meta);

  // for (let i = 0; i <= 20; i++) {
  //   let svg = await contract.generateSVG(i, 0, 0, false);
  //   let filename = "./gen/" + "/" + i + ".svg";
  //   await fs.writeFileSync(filename, svg);
  //   console.log("generated: " + i + "/5");
  // }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
