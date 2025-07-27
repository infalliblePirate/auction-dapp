const hre = require('../utils/hardhat.bootstrap');
const auctionRepository = require('../repositories/auction.repository');

const FACTORY_ADDRESS = "0xCdE8F1B0933f4b9EeF475b8C0A9FCda0c5C160e2";


async function createAuction({ biddingTime }) {
    const [deployer] = await hre.ethers.getSigners();
    const beneficiary = deployer.address;

    const auction = await auctionRepository.createAuction(FACTORY_ADDRESS, biddingTime, beneficiary);

    console.log(`Auction created at ${auction.address}`);
    return auction;
}

module.exports = {
    createAuction
}