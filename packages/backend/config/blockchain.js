import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const factoryArtifactPath = path.resolve(
  "./packages/onchain/artifacts/contracts/AuctionFactory.sol/AuctionFactory.json"
);
const auctionArtifactPath = path.resolve(
  "./packages/onchain/artifacts/contracts/Auction.sol/Auction.json"
);

const factoryArtifact = JSON.parse(fs.readFileSync(factoryArtifactPath, "utf-8"));
const auctionArtifact = JSON.parse(fs.readFileSync(auctionArtifactPath, "utf-8"));

const factoryAddress = process.env.FACTORY_ADDRESS;

const httpProvider = new ethers.JsonRpcProvider(process.env.BNB_TEST_HTTP_URL);
const wsProvider = new ethers.WebSocketProvider(process.env.BNB_TEST_WS_URL);

const signer = ethers.Wallet.fromPhrase(process.env.MNEMONIC).connect(httpProvider);
const signerWs = ethers.Wallet.fromPhrase(process.env.MNEMONIC).connect(wsProvider);

const factory = new ethers.Contract(factoryAddress, factoryArtifact.abi, signer);
const factoryWs = new ethers.Contract(factoryAddress, factoryArtifact.abi, signerWs);

export { httpProvider, wsProvider, signer, factory, factoryWs, auctionArtifact };