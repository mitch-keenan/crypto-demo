# Crypto Demo

This demo shows off two proof of concept functions: [getOwnedNFTs](src/getOwnedNFTs.ts) and [getNFTOwners](src/getNFTOwners.ts). It uses the Goerli testnet and test NFTs generated for this purpose but should be functional on the Ethereum mainnet as well.

## Prerequisites

* [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

## Installation

1. `nvm use`
2. `yarn install`

## Running

`yarn start`

## Example Output

### `getNFTOwners`

Can be used with or without a "tokenId" to scope the list of owners to a specific token within the contract, or to simply get the list of all owners of any token within the contract.

```json
// getNFTOwners(<contractID>)
[
  {
    "address": "0x8569Fc3052EAC955A946872Bec4142B07840fA3A",
    "balance": 12
  },
  {
    "address": "0x7B6a2D483b22976C1a1447E57b4f7C97B682569f",
    "balance": 1
  }
]

// getNFTOwners(<contractID>, <tokenID>)
[
  {
    "address": "0x8569Fc3052EAC955A946872Bec4142B07840fA3A",
    "balance": 9
  },
  {
    "address": "0x7B6a2D483b22976C1a1447E57b4f7C97B682569f",
    "balance": 1
  }
]

```

### `getOwnedNFTs`

```json
// getOwnedNFTs(<contractID>, <walletID>)
[
	{
		"name": "Mitch Test NFT",
		"description": "",
		"image": "https://gateway.ipfscdn.io/ipfs/QmYfHtBbjHjXU5YdHnjZeSCVkKBrsjkawfPGNDrxBHdtpn/0.png",
		"external_url": "",
		"id": 0,
		"uri": "ipfs://QmbRmVBoi2zUuyXfHhNmwYfgUKo3bNmHQTwsBeiDu3UPCC/0",
		"background_color": "",
		"supply": 10,
		"quantityOwned": 9
	},
	{
		"name": "Mitch Test NFT 2",
		"description": "",
		"external_url": "",
		"id": 1,
		"uri": "ipfs://Qmb1ygdWHXdTH9pX4KTHL5pEPasgwCa4yy9v2pTQoEirMm/0",
		"background_color": "",
		"supply": 3,
		"quantityOwned": 3
	}
]
```