import { ContractEvent, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { BigNumber, BigNumberish } from "ethers";

// Wrapper for ContractEvent to correctly type `data`
interface EventTransferSingle extends ContractEvent {
	data: {
		operator: string;
		from: string;
		to: string;
		id: BigNumber;
		value: BigNumber;
	};
}

const DEFAULT_ADDRESS = "0x0000000000000000000000000000000000000000";

enum Erc1155Events {
	TransferSingle = "TransferSingle",
}

class WalletTracker {
	address: string;
	balance: number;

	constructor(address: string) {
		this.address = address;
		this.balance = 0;
	}

	processTransfer(event: EventTransferSingle) {
		// Skip self transfers
		if (event.data.from === event.data.to) return;

		let amount = event.data.value.toNumber();
		if (this.address === event.data.from) {
			amount *= -1;
		}
		this.balance += amount;
	}
}

class TokenOwnersTracker {
	tokenId: BigNumberish;
	private owners: { [key: string]: WalletTracker } = {};

	constructor(tokenId: BigNumberish) {
		this.tokenId = tokenId;
		this.processEvent = this.processEvent.bind(this);
	}

	_getWallet(address: string) {
		if (!this.owners[address]) {
			this.owners[address] = new WalletTracker(address);
		}
		return this.owners[address];
	}

	processEvent(event: EventTransferSingle) {
		if (!event.data.id.eq(this.tokenId)) return;
		this._getWallet(event.data.from).processTransfer(event);
		this._getWallet(event.data.to).processTransfer(event);
	}

	getList() {
		return Object.values(this.owners).filter(
			(owner) => owner.address != DEFAULT_ADDRESS
		);
	}
}

const getOwners = async (contractId: string, tokenId: BigNumberish) => {
	const sdk = new ThirdwebSDK("goerli");
	const contract = sdk.getEdition(contractId);
	const events = await contract.events.getEvents(Erc1155Events.TransferSingle, {
		order: "asc",
	});

	const owners = new TokenOwnersTracker(tokenId);
	events.forEach(owners.processEvent);
	return owners.getList();
};

export default getOwners;
