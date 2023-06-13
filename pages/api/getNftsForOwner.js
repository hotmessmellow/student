import { Network, Alchemy } from "alchemy-sdk";

// A utility function for formatting the NFT data
function formatNFTs(nfts) {
  return nfts.ownedNfts.map((nft) => {
    const {
      contract,
      title,
      tokenType,
      tokenId,
      description,
      media,
      rawMetadata,
    } = nft;

    return {
      contract: contract.address,
      symbol: contract.symbol,
      collectionName: contract.openSea?.collectionName,
      media: media[0]?.gateway
        ? media[0]?.gateway
        : "https://via.placeholder.com/500",
      verified: contract.openSea?.safelistRequestStatus,
      tokenType,
      tokenId,
      title,
      description,
      format: media[0]?.format ? media[0]?.format : "png",
      attributes: rawMetadata?.attributes,
    };
  });
}

export default async function handler(req, res) {
  const { address, pageSize, chain, pageKey } = JSON.parse(req.body);
  console.log("address", address);

  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests allowed" });
    return;
  }

  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network[chain],
  };

  let alchemy;
  try {
    alchemy = new Alchemy(settings);
  } catch (e) {
    console.error("Error initializing Alchemy: ", e);
    res.status(500).json({ message: "Failed to initialize Alchemy" });
    return;
  }

  let nfts;
  try {
    nfts = await alchemy.nft.getNftsForOwner(address, {
      pageSize: pageSize ? pageSize : 100,
      pageKey: pageKey ? pageKey : "",
    });
  } catch (e) {
    console.error("Error getting NFTs for owner: ", e);
    res.status(500).json({ message: "Failed to retrieve NFTs" });
    return;
  }

  let formattedNfts;
  try {
    formattedNfts = formatNFTs(nfts);
  } catch (e) {
    console.error("Error formatting NFTs: ", e);
    res.status(500).json({ message: "Failed to format NFTs" });
    return;
  }

  res.status(200).json({
    nfts: formattedNfts.length
      ? formattedNfts.filter(
          (nft) => nft.contract == 0x4785a899efc52b0edc4c3715aa027a647a78a861
        )
      : null,
    pageKey: nfts.pageKey,
  });
}
