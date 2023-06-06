import { Network, Alchemy } from "alchemy-sdk";

export default async function handler(req, res) {
  const { address, pageSize, chain, pageKey } = JSON.parse(req.body);
  console.log("address", address);
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network[chain],
  };

  const alchemy = new Alchemy(settings);

  try {
    const nfts = await alchemy.nft.getNftsForOwner(address, {
      pageSize: pageSize ? pageSize : 100,
      pageKey: pageKey ? pageKey : "",
    });

    const formattedNfts = nfts.ownedNfts.map((nft) => {
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

    res.status(200).json({
      nfts: formattedNfts.length
        ? formattedNfts.filter(
            (nft) => nft.contract == 0x4785a899efc52b0edc4c3715aa027a647a78a861
          )
        : null,
      pageKey: nfts.pageKey,
    });
  } catch (e) {
    console.warn(e);
    res.status(500).send({
      message: "something went wrong, check the log in your terminal",
    });
  }
}
