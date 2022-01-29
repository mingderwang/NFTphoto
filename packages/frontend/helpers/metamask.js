import { ethers } from "ethers";
export var provider;
export var signer;
export const connectMetamask = async (
  accountChangedCallback,
  networkChangedCallback
) => {
  if (typeof window !== "undefined") {
    if (typeof window.ethereum === "undefined") {
      console.log("MetaMask is NOT installed!");
      return { address: "no metamask", network: "no network" };
    } else {
      window.ethereum.on("accountsChanged", accountChangedCallback);
      window.ethereum.on("chainChanged", networkChangedCallback);
      provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      const address = await signer.getAddress();
      const { chainId } = await provider.getNetwork();
      const chain = "0x" + chainId.toString(16);
      return { address: address, network: chain };
    }
  }
};

export const callContract = async (TokenURI, mintFailCallback) => {
  const nftphotoAddress = "0x0a16ad8C7eF1C3E025EC2dbC0FbB434dfd6b1C1A";

  const nftphotoAbi =
    require("../../hardhat/artifacts/contracts/NFTphoto.sol/NFTphoto.json").abi;

  const nftphoto_ro = new ethers.Contract(
    nftphotoAddress,
    nftphotoAbi,
    provider
  );
  const nftphoto_rw = new ethers.Contract(nftphotoAddress, nftphotoAbi, signer);
  const balance = await nftphoto_ro.name();
  try {
    const tx = await nftphoto_rw.Mint(signer.getAddress(), TokenURI);
    console.log("mint", tx);
    const receipt = await tx.wait();
    console.log("wait", receipt);
    mintFailCallback("1");
    return receipt;
  } catch (e) {
    console.log("error", e);
    mintFailCallback("2");
    return {};
  }
};
