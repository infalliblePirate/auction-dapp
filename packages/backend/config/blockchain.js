require("dotenv").config();
const { ethers } = require("ethers");

const factoryArtifact = require("../../onchain/artifacts/contracts/AuctionFactory.sol/AuctionFactory.json");

const factoryAddress = process.env.FACTORY_ADDRESS;

const provider = new ethers.JsonRpcProvider(process.env.BNB_TEST_URL);
const signer = ethers.Wallet.fromPhrase(process.env.MNEMONIC).connect(provider);

const factory = new ethers.Contract(factoryAddress, factoryArtifact.abi, signer);

module.exports = { provider, signer, factory };
