module.exports = async (hre: any) => {
  const { getNamedAccounts, deployments, getChainId, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const { getContract } = require("../test/testutils");

  // ------------------------------------- deploy

  console.log("loading decorations");
  let decorations = await getContract("Decorations");
  console.log("loading color");
  let color = await getContract("Color");

  //    SILHOUTTE = 1;
  //    SKY_MATH = 2;
  //    DECORATION_ONE = 3;
  //    FOCUS = 4;

  // ------------------------------------------------------------------- Free

  await deployAndRegister(
    "Empty_Silhouette",
    1,
    deploy,
    deployer,
    color,
    decorations
  );

  await deployAndRegister(
    "Empty_SkyMath",
    2,
    deploy,
    deployer,
    color,
    decorations
  );
  await deployAndRegister(
    "Empty_Deco",
    3,
    deploy,
    deployer,
    color,
    decorations
  );

  await deployAndRegister(
    "MountainLine",
    1,
    deploy,
    deployer,
    color,
    decorations
  );

  await deployAndRegister("Waves", 1, deploy, deployer, color, decorations);

  await deployAndRegister("SkyCircle", 2, deploy, deployer, color, decorations);
  // ------------------------------------------------------------------- Paid
  await deployAndRegister("Cat", 1, deploy, deployer, color, decorations);

  // console.log("registering mountains");
  // try {
  //   const registerMountains = await decorations.register(
  //     mountainLine.address,
  //     1
  //   );
  //   await registerMountains.wait();
  // } catch (e) {
  //   console.log(e);
  // }

  // console.log("registering skycircle");
  // try {
  //   const registerSkyCircle = await decorations.register(skyCircle.address, 2);
  //   await registerSkyCircle.wait();
  // } catch (e) {
  //   console.log(e);
  // }
};

async function deployAndRegister(
  name: string,
  slot: number,
  deploy: Function,
  deployer: any,
  color: any,
  decorations: any
) {
  const deployment = await deploy(name, {
    from: deployer,
    libraries: {
      Color: color.address,
    },
    log: true,
  });

  console.log("Registering " + name);
  try {
    const registerMountains = await decorations.register(
      deployment.address,
      slot
    );
    await registerMountains.wait();
  } catch (e) {
    console.log("Already Registered");
  }
}

module.exports.tags = ["nightsky-deco"];
