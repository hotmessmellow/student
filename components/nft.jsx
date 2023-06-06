export default function NFT({ nft }) {
  // attributes: [{},{},{}]

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-2 py-4 mx-auto sm:py-4 lg:max-w-7xl ">
        <div className="p-2 lg:grid lg:grid-cols-2 lg:items-start">
          {/* Image gallery */}

          <div className="mr-4">
            <img
              src={nft.media}
              alt=""
              className="object-cover object-center w-full h-full rounded-lg shadow-lg"
            />
          </div>

          <div className="px-4 mt-10 sm:mt-16 sm:px-0 lg:mt-0">
            <div className="mt-3">
              <p className="text-xl tracking-tight text-gray-900">
                Edition: {nft.tokenId}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: nft.description }}
              />
            </div>
            {nft?.attributes
              .filter((nft) => {
                return nft.trait_type !== "Edition";
              })
              .filter((nft) => {
                return nft.trait_type !== "Reward";
              })
              .map((attribute, index) => {
                return (
                  <div className="mt-1 " key={index}>
                    <h3 className="sr-only">{attribute.trait_type}</h3>
                    <div className="flex flex-col ">
                      <div
                        className="text-sm font-semibold text-left text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: attribute.trait_type,
                        }}
                      />
                      <div
                        className="text-xs text-gray-700"
                        dangerouslySetInnerHTML={{ __html: attribute.value }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
