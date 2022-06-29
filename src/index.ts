import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import "dotenv/config";

const Moralis = require("moralis/node");

const { MORALIS_API_KEY } = process.env;

enum WALLETS {
	MAIN = "0x8569Fc3052EAC955A946872Bec4142B07840fA3A",
	SECONDARY = "0x7B6a2D483b22976C1a1447E57b4f7C97B682569f",
}

enum EVENTS {
	TRANSFER_SINGLE = "TransferSingle",
}

const sdk = new ThirdwebSDK("goerli");

const CONTRACT_ID = "0xDac7521A4e3Ffc807FbE14938B04c4118446c62f";
const contract = sdk.getEdition(CONTRACT_ID);

const main = async () => {
	// await printTransferEvents();

	await printOwned(WALLETS.MAIN);
	await printOwners(CONTRACT_ID);
	// await printOwned();
};

const printTransferEvents = async () => {
	const events = await contract.events.getEvents(EVENTS.TRANSFER_SINGLE);
	console.log(events);
};

const printOwned = async (wallet?: string) => {
	const owned = await contract.getOwned(wallet);
	if (!owned.length) return;
	owned.forEach((nft) => {
		const name = nft.metadata.name;
		const supply = nft.supply.toNumber();
		const quantityOwned = nft.quantityOwned.toNumber();
		console.log({ name, supply, quantityOwned });
	});
};

const printOwners = async (address: string) => {
	await Moralis.start({ moralisSecret: MORALIS_API_KEY });
	const results = await Moralis.Web3API.token.getNFTOwners({
		chain: "goerli",
		address,
	});
	console.log(results);
	// https://deep-index.moralis.io/api/v2/nft/0xDac7521A4e3Ffc807FbE14938B04c4118446c62f/owners?chain=goerli&format=decimal
};

// TODO:
// Why aren't they exposing the full `balanceOfBatch` api, and can I just use it:
// https://portal.thirdweb.com/contracts/TokenERC1155#balanceofbatch
//
const allOwner = async () => {
	// await contract
	// 	const maxId = await this.contractWrapper.readContract.nextTokenIdToMint();
	// const balances = await this.contractWrapper.readContract.balanceOfBatch(
	// 	Array(maxId.toNumber()).fill(address),
	// 	Array.from(Array(maxId.toNumber()).keys())
	// );
	// 	const ownedBalances = balances
	// 		.map((b, i) => {
	// 			return {
	// 				tokenId: i,
	// 				balance: b,
	// 			};
	// 		})
	// 		.filter((b) => b.balance.gt(0));
	// 	const balances = await Promise.all(
	// 		ownedBalances.map(async (b) => {
	// 			const editionMetadata = await this.erc1155.get(b.tokenId.toString());
	// 			return {
	// 				...editionMetadata,
	// 				owner: address,
	// 				quantityOwned: b.balance,
	// 			};
	// 		})
	// 	);
};

main();
