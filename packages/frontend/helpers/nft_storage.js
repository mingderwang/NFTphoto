import { toGatewayURL, NFTStorage, Blob } from "nft.storage";
const { NFT_STORAGE_KEY } = require("../.secret.json");
import { callContract } from "../helpers";

const create = async (JsonItem, callback) => {
  callback("0"); // start alter
  const apiKey = NFT_STORAGE_KEY;
  const client = new NFTStorage({ token: apiKey });
  JsonItem.image_thumbnail_url;
  const jsonse = JsonItem;
  const obj = {
    name: JsonItem.description,
    description: JsonItem.board.description,
    external_url: JsonItem.link,
    image: JsonItem.images["564x"].url,
  };
  const metadata = new Blob([JSON.stringify(obj)], {
    type: "application/json",
  });
  const metadataCid = await client.storeBlob(metadata);
  const metadataUrl = "https://ipfs.io/ipfs/" + metadataCid;
  // https://ipfs.io/ipfs/bafkreigbq7i3drrdomco4l45rc6luta4kg2y3en6xm52z3ote4ezbrbe5e
  console.log("successfully generate metadata on ", metadataUrl);
  const result = await callContract(metadataUrl, callback); // to TokenURI
  console.log("callContract result", result);
  return { ipfs_url: metadataUrl };
};

export const nft_storage = {
  create,
};
