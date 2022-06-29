import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const getOwned = async (contractId: string, wallet: string) => {
	const sdk = new ThirdwebSDK("goerli");
	const contract = sdk.getEdition(contractId);
	const owned = await contract.getOwned(wallet);

	return owned.map((nft) => ({
		...nft.metadata,
		supply: nft.supply.toNumber(),
		quantityOwned: nft.quantityOwned.toNumber(),
	}));
};

export default getOwned;
