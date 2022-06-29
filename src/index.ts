import getOwned from "./getOwned";
import getOwners from "./getOwners";

const WALLET = "0x8569Fc3052EAC955A946872Bec4142B07840fA3A";
const CONTRACT_ID = "0xDac7521A4e3Ffc807FbE14938B04c4118446c62f";
const TOKEN_ID = 0;

const main = async () => {
	const owners = await getOwners(CONTRACT_ID, TOKEN_ID);
	console.log(owners);

	const owned = await getOwned(CONTRACT_ID, WALLET);
	console.log(owned);
};

main();
