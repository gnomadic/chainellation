import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, deployments, getNamedAccounts } from "hardhat";
import { getContract, setNight, setTime, testJSON } from "./testutils";
const fs = require("fs");

describe("decorations", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployChainellation() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    await deployments.fixture(["nightsky", "nightsky-deco"]);

    console.log("deploying chainellation");

    const chainellation = await getContract("Chainellation");
    const decorations = await getContract("Decorations");

    return { owner, chainellation, decorations };
  }

  describe("Initialize", function () {
    it("Should start with multiple registered decorations", async function () {
      const { owner, chainellation, decorations } = await loadFixture(
        deployChainellation
      );

      let decos = await decorations.getAllDecorations();
      expect(decos.length).to.be.greaterThan(4);
    });

    it("Should start with free public decorations available", async function () {
      const { owner, chainellation, decorations } = await loadFixture(
        deployChainellation
      );

      let all = await decorations.getAllDecorations();
      let decos = await decorations.getAvailableDecorations(owner.address);

      // console.log("decos: ", decos);
      const emptySil = await getContract("Empty_Silhouette");
      const emptySky = await getContract("Empty_SkyMath");
      const emptyDeco = await getContract("Empty_Deco");
      const circles = await getContract("SkyCircle");
      const mountains = await getContract("MountainLine");

      expect(decos[0].length).to.be.greaterThan(4);
      expect(decos[0].length).to.equal(decos[1].length);

      expect(decos[0]).to.contain(emptySil.address);
      expect(decos[0]).to.contain(emptySky.address);
      expect(decos[0]).to.contain(emptyDeco.address);
      expect(decos[0]).to.contain(circles.address);
      expect(decos[0]).to.contain(mountains.address);
    });
  });

  it("Should fake metadata in mountains", async function () {
    const { owner, chainellation, decorations } = await loadFixture(
      deployChainellation
    );

    const mountainLine = await getContract("MountainLine");
    let meta = await mountainLine.tokenURI(1);
    expect(meta.length).to.be.greaterThan(100);
  });

  it("Should let me unregister", async function () {
    const { owner, chainellation, decorations } = await loadFixture(
      deployChainellation
    );

    let decos = await decorations.getAllDecorations();

    let decoCount = decos.length;
    let second = decos[1];

    let tx = await decorations.unregister(second);
    await tx.wait();

    decos = await decorations.getAllDecorations();
    // console.log(decos);
    expect(decos.length).to.equal(decoCount - 1);
    expect(decos).to.not.contain(second);
  });

  describe("metadata", function () {
    it("Should generate a proper metadata", async function () {
      const { owner, chainellation, decorations } = await loadFixture(
        deployChainellation
      );

      let mint = await chainellation.mint(100);
      await mint.wait();

      const emptyDeco = await getContract("Empty_Deco");
      const emptySil = await getContract("Empty_Silhouette");
      const emptysky = await getContract("Empty_SkyMath");
      const mountainLine = await getContract("MountainLine");
      const skycircle = await getContract("SkyCircle");

      let preview = await emptyDeco.tokenURI(0);
      let sub = preview.substring("data:application/json;base64,".length);
      expect(testJSON(atob(sub))).to.equal(true);

      preview = await emptySil.tokenURI(0);
      sub = preview.substring("data:application/json;base64,".length);
      expect(testJSON(atob(sub))).to.equal(true);

      preview = await emptysky.tokenURI(0);
      sub = preview.substring("data:application/json;base64,".length);
      expect(testJSON(atob(sub))).to.equal(true);

      preview = await mountainLine.tokenURI(0);
      sub = preview.substring("data:application/json;base64,".length);
      expect(testJSON(atob(sub))).to.equal(true);

      preview = await skycircle.tokenURI(0);
      sub = preview.substring("data:application/json;base64,".length);
      expect(testJSON(atob(sub))).to.equal(true);
    });
  });

  describe("setting", function () {
    it("Should let me set a free decorations", async function () {
      const { owner, chainellation, decorations } = await loadFixture(
        deployChainellation
      );

      let mint = await chainellation.mint(100);
      await mint.wait();

      let ogMeta = await chainellation.tokenURI(1);

      let decos = await decorations.getAvailableDecorations(owner.address);

      //think skymath is 4 but not sure it matters, just gotta be a free one
      let decoAddress = decos[0][4];
      let decoSlot = decos[1][4];

      let tx = await decorations.setDecoration(1, decoSlot, decoAddress, 1);

      await tx.wait();

      let newMeta = await chainellation.tokenURI(1);
      expect(ogMeta).to.not.equal(newMeta);
    });

    it("Should let me set a decoration batch", async function () {
      const { owner, chainellation, decorations } = await loadFixture(
        deployChainellation
      );

      let mint = await chainellation.mint(100);
      await mint.wait();

      let ogMeta = await chainellation.tokenURI(1);

      let decos = await decorations.getAvailableDecorations(owner.address);

      //think skymath is 4 but not sure it matters, just gotta be a free one
      let decoAddress = decos[0][4];
      let decoSlot = decos[1][4];

      let tx = await decorations.setDecorationBatch(
        1,
        [decoSlot],
        [decoAddress],
        [1]
      );

      await tx.wait();

      let newMeta = await chainellation.tokenURI(1);
      expect(ogMeta).to.not.equal(newMeta);
    });

    it("Should let me set an NFT decoration", async function () {
      const { owner, chainellation, decorations } = await loadFixture(
        deployChainellation
      );

      let mint = await chainellation.mint(100);
      await mint.wait();
      let ogMeta = await chainellation.tokenURI(1);

      const cat = await getContract("Cat");
      let catmint = await cat.mint();
      await catmint.wait();

      let tx = await decorations.setDecoration(1, 1, cat.address, 1);

      await tx.wait();

      let newMeta = await chainellation.tokenURI(1);
      expect(ogMeta).to.not.equal(newMeta);
    });

    it("Should soulbind an NFT decoration", async function () {
      const { owner, chainellation, decorations } = await loadFixture(
        deployChainellation
      );

      let mint = await chainellation.mint(100);
      await mint.wait();

      const cat = await getContract("Cat");
      let catmint = await cat.mint();
      await catmint.wait();

      let tx = await decorations.setDecoration(1, 1, cat.address, 1);

      await tx.wait();

      let soulbound = await cat.soulbound(1);
      expect(soulbound).to.equal(true);

      let meta = await chainellation.tokenURI(1);
      // console.log(meta);
    });

    it("Should not let me transfer or approve a souldbound nft", async function () {
      const { owner, chainellation, decorations } = await loadFixture(
        deployChainellation
      );

      const [ownersigh, account2, others] = await ethers.getSigners();

      let mint = await chainellation.mint(100);
      await mint.wait();

      const cat = await getContract("Cat");
      let catmint = await cat.mint();
      await catmint.wait();

      let tx = await decorations.setDecoration(1, 1, cat.address, 1);

      await tx.wait();

      await expect(
        cat.transferFrom(owner.address, account2.address, 1)
      ).to.be.rejectedWith("SoulBound()");

      await expect(cat.approve(account2.address, 1)).to.be.rejectedWith(
        "SoulBound()"
      );
    });
  });
});
