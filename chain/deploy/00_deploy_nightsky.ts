module.exports = async (hre: any) => {
  const { getNamedAccounts, deployments, getChainId, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  const { getContract } = require("../test/testutils");

  const color = await deploy("Color", {
    from: deployer,
    log: true,
  });

  const constellation = await deploy("Constellations", {
    from: deployer,
    log: true,
  });

  const chainellationRenderer = await deploy("ChainellationRenderer", {
    from: deployer,
    libraries: {
      Color: color.address,
      Constellations: constellation.address,
    },
    log: true,
  });

  const Chainellation = await deploy("Chainellation", {
    from: deployer,
    args: [chainellationRenderer.address],
    libraries: {
      Color: color.address,
    },
    log: true,
  });

  const decorations = await deploy("Decorations", {
    from: deployer,
    args: [Chainellation.address],
    libraries: {
      Color: color.address,
      Constellations: constellation.address,
    },
    log: true,
  });

  const chainellation = await getContract("Chainellation");
  try {
    console.log("setting decorator");
    const setDecorator = await chainellation.setDecorator(decorations.address);
    let receipt = await setDecorator.wait();
    console.log("set decorator");
  } catch (e) {
    console.log(e);
  }

  //-----

  //   console.log("done deploying");
  //   if (
  //     chainId !== "31337" &&
  //     hre.network.name !== "localhost" &&
  //     hre.network.name !== "hardhat"
  //   ) {
  //     console.log("verifing");
  //     await verify(asgardSkyCastle.address, "AsgardSkyCastle", "", [
  //       shares,
  //       team,
  //     ]);
  //     await verify(skyCastleStats.address, "SkyCastleStats", "", [
  //       asgardSkyCastle.address,
  //     ]);
  //     await verify(loot.address, "Loot", "tokens");
  //     await verify(itemVault.address, "ItemVault", "", [
  //       loot.address,
  //       asgardSkyCastle.address,
  //     ]);
  //     await verify(region.address, "Region", "tokens");
  //     await verify(explorer.address, "Explorer", "games", [
  //       asgardSkyCastle.address,
  //       itemVault.address,
  //       skyCastleStats.address,
  //       region.address,
  //     ]);
  //     await verify(townStore.address, "TownStore", "tokens");
  //     await verify(townShip.address, "TownShip", "games", [
  //       townStore.address,
  //       loot.address,
  //       asgardSkyCastle.address,
  //     ]);
  //   }

  //   // ------------------------------------- helpers

  //   async function verify(address_, contractName_, dir_ = "", args_ = []) {
  //     try {
  //       await hre.run("verify:verify", {
  //         address: address_,
  //         contract: `contracts/${dir_}/${contractName_}.sol:${contractName_}`,
  //         constructorArguments: args_,
  //       });
  //     } catch (error) {
  //       console.log("error:", error.message);
  //     }
  //   }
};

module.exports.tags = ["nightsky"];
