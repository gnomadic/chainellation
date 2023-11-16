import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, deployments, getNamedAccounts } from "hardhat";
import { getContract, setNight, setTime } from "./testutils";
const fs = require("fs");

describe("chainellation", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployChainellation() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    await deployments.fixture(["nightsky", "nightsky-deco"]);

    console.log("deploying chainellation");

    const renderer = await getContract("ChainellationRenderer");
    const color = await getContract("Color");

    const chainellation = await getContract("Chainellation");

    const Mockellation = await ethers.getContractFactory("Mockellation", {
      arguments: [renderer.address],
      libraries: {
        Color: color.address,
      },
    });
    const mockellation = await Mockellation.deploy(renderer.address);

    return { renderer, chainellation, mockellation };
  }

  describe("Generation", function () {
    it("should show meta", async function () {
      const { renderer, chainellation, mockellation } = await loadFixture(
        deployChainellation
      );
      const mintPrice = await chainellation.mintCost();

      let mint = await chainellation.mint("0", { value: mintPrice });
      await mint.wait();
      var meta = await chainellation.generateSVG(1, 50, false, 0);
      console.log("", meta);
    });

    it("Should generate unique metadata ", async function () {
      const { renderer, chainellation, mockellation } = await loadFixture(
        deployChainellation
      );

      const mintPrice = await chainellation.mintCost();

      let mint = await chainellation.mint("0", { value: mintPrice });
      await mint.wait();
      mint = await chainellation.mint("0", { value: mintPrice });
      await mint.wait();
      mint = await chainellation.mint("0", { value: mintPrice });
      await mint.wait();

      let meta1 = await chainellation.tokenURI(1);
      let meta2 = await chainellation.tokenURI(2);
      let meta3 = await chainellation.tokenURI(3);

      expect(meta1).to.not.be.equal(meta2);
      expect(meta1).to.not.be.equal(meta3);
      expect(meta2).to.not.be.equal(meta3);
    });
  });

  describe("Gazing", function () {
    it("Should not let you stargaze more than once a day", async function () {
      const { renderer, chainellation, mockellation } = await loadFixture(
        deployChainellation
      );
      setNight(mockellation);
      const mintPrice = await mockellation.mintCost();

      let mint = await mockellation.mint("0", { value: mintPrice });
      await mint.wait();

      let gaze = await mockellation.starGaze(1);
      await gaze.wait();

      await expect(mockellation.starGaze(1)).to.be.rejectedWith(
        "NotEnoughTimePassed"
      );
    });

    it("Should not let you stargaze an NFT you don't hold", async function () {
      const { renderer, chainellation, mockellation } = await loadFixture(
        deployChainellation
      );
      const [owner, otherAccount] = await ethers.getSigners();
      const mintPrice = await chainellation.mintCost();

      let mint = await chainellation.mint("0", { value: mintPrice });
      await mint.wait();

      await expect(
        chainellation.connect(otherAccount).starGaze(1)
      ).to.be.rejectedWith("NotTheOwner");
    });

    it("Should only let you gaze at night", async function () {
      const { renderer, chainellation, mockellation } = await loadFixture(
        deployChainellation
      );
      const mintPrice = await mockellation.mintCost();
      let time = 1681000348; // ~8:30 Pm on April 8th
      await setTime(time, mockellation);

      let mint = await mockellation.mint("0", { value: mintPrice });
      await mint.wait();

      await mockellation.starGaze(1);

      await mockellation.setSystemTime(time + 43200 + 86400);
      await expect(mockellation.starGaze(1)).to.be.rejectedWith("NotNight");
    });
  });

  describe("Timezones", function () {
    it("Should account for timezones", async function () {
      const { renderer, chainellation, mockellation } = await loadFixture(
        deployChainellation
      );
      const mintPrice = await mockellation.mintCost();
      let time = 1681000348; // ~8:30 Pm on April 8th
      await setTime(time, mockellation);

      let mint = await mockellation.mint("200", { value: mintPrice });
      await mint.wait();

      let systemTime = await mockellation.systemTime();
      expect(systemTime).to.be.equal(time);
      let userTime = await mockellation.systemTimeOffsetWithUser(1);
      expect(userTime).to.be.equal(time + 200);
    });
  });
  describe("minting", function () {
    it("Should let me customize a mint", async function () {
      const { renderer, chainellation, mockellation } = await loadFixture(
        deployChainellation
      );

      let mint = await chainellation.mintCustom(100, 10, 10, 1, 1, {
        value: ethers.utils.parseEther("1"),
      });
      await mint.wait();

      mint = await chainellation.mintCustom(100, 370, 370, 0, 0);
      await mint.wait();
    });

    it("Should price a custom mint properly", async function () {
      const { renderer, chainellation, mockellation } = await loadFixture(
        deployChainellation
      );
      let setPrice = await chainellation.setCustomizeCost(
        ethers.utils.parseEther("0.5")
      );
      await setPrice.wait();

      let mint = await chainellation.mintCustom(100, 370, 10, 0, 0, {
        value: ethers.utils.parseEther("0.5"),
      });
      await mint.wait();
      mint = await chainellation.mintCustom(100, 10, 370, 0, 0, {
        value: ethers.utils.parseEther("0.5"),
      });
      await mint.wait();
      mint = await chainellation.mintCustom(100, 10, 10, 0, 0, {
        value: ethers.utils.parseEther("0.5"),
      });
      await mint.wait();
      mint = await chainellation.mintCustom(100, 370, 370, 1, 0, {
        value: ethers.utils.parseEther("0.5"),
      });
      await mint.wait();

      mint = await chainellation.mintCustom(100, 370, 370, 0, 1, {
        value: ethers.utils.parseEther("0.5"),
      });
      await mint.wait();
      mint = await chainellation.mintCustom(100, 370, 370, 1, 1, {
        value: ethers.utils.parseEther("1"),
      });
      await mint.wait();
      mint = await chainellation.mintCustom(100, 370, 10, 1, 1, {
        value: ethers.utils.parseEther("1.5"),
      });
      await mint.wait();
    });
  });
});
