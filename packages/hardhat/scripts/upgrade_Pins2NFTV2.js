// scripts/upgrade_Pins2NFTV2.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const Pins2NFTV2 = await ethers.getContractFactory("Pins2NFTV2");
  console.log("Upgrading Pins2NFT to V2...");
  await upgrades.upgradeProxy(
    "0x02894bcb6131b8a9a853f4bbc7198377d0c6f013",
    Pins2NFTV2
  );
  console.log("Pins2NF is upgraded to Pins2NFTV2");
}

main();
