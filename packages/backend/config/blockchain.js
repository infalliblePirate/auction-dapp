import 'dotenv/config';
import { ethers } from 'ethers';

import factoryArtifact from '../../onchain/artifacts/contracts/AuctionFactory.sol/AuctionFactory.json' with { type: 'json' };
import auctionArtifact from '../../onchain/artifacts/contracts/Auction.sol/Auction.json' with { type: 'json' };

const factoryAddress = process.env.FACTORY_ADDRESS;

const httpProvider = new ethers.JsonRpcProvider(process.env.BNB_TEST_HTTP_URL);
const wsProvider = new ethers.WebSocketProvider(process.env.BNB_TEST_WS_URL);

const signer = ethers.Wallet.fromPhrase(process.env.MNEMONIC).connect(httpProvider);
const signerWs = ethers.Wallet.fromPhrase(process.env.MNEMONIC).connect(wsProvider);

const factory = new ethers.Contract(factoryAddress, factoryArtifact.abi, signer);
const factoryWs = new ethers.Contract(factoryAddress, factoryArtifact.abi, signerWs);

export { httpProvider, wsProvider, signer, factory, factoryWs, auctionArtifact };