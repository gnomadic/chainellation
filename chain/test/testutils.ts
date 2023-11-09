const { ethers, deployments } = require("hardhat");

function BN(input: any) {
  return ethers.BigNumber.from(input);
}

async function mineNBlocks(n: number) {
  for (let index = 0; index < n; index++) {
    await ethers.provider.send("evm_mine");
  }
}

export async function setNight(mockellation: any) {
  let time = 1681000348; // ~8:30 Pm on April 8th
  await setTime(time, mockellation);
}

export async function setTime(time: number, mockellation: any) {
  let updateTime = await mockellation.setSystemTime(time);
  await updateTime.wait();
}

export const getContract = async (name: string) => {
  const deployment = await deployments.get(name);
  return await ethers.getContractAt(name, deployment.address);
};

const add = (first: any, second: any) => {
  const firstBig = ethers.BigNumber.from(first.toString());
  const secondBig = ethers.BigNumber.from(second.toString());
  return ethers.BigNumber.from(firstBig.add(secondBig));
};

const closeEnough = (first: any, second: any) => {
  return Math.abs(first - second) < 1e-13;
};

export function testJSON(text: string) {
  if (typeof text !== "string") {
    return false;
  }
  try {
    var json = JSON.parse(text);
    return typeof json === "object";
  } catch (error) {
    return false;
  }
}
