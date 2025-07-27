const hre = require('../utils/hardhat.bootstrap');
const logger = require('../logger');

const { TransactionFailedError, EventNotFoundError } = require('../errors/errors');

async function createAuction(factoryAddress, biddingTime, beneficiary) {
    logger.info({ factoryAddress, biddingTime, beneficiary }, 'Creating auction');

    const factory = await hre.ethers.getContractAt("AuctionFactory", factoryAddress);
    const tx = await factory.createAuction(biddingTime, beneficiary);
    const receipt = await tx.wait();

    if (receipt.status !== 1) {
        logger.error({ txHash: tx.hash }, 'Auction creation transaction failed');
        throw new TransactionFailedError();
    }

    const auctionCreatedEvents = receipt.logs.filter(log =>
        log.address.toLowerCase() === factoryAddress.toLowerCase() &&
        log.topics[0] === factory.interface.getEvent('AuctionCreated').topicHash
    );

    if (auctionCreatedEvents.length === 0) {
        logger.error({ txHash: tx.hash }, 'AuctionCreated event not found in logs');
        throw new EventNotFoundError();
    }

    const event = factory.interface.parseLog(auctionCreatedEvents[0]);

    const result = {
        address: event.args.clone,
        beneficiary: event.args.beneficiary,
        biddingTime: Number(event.args.biddingTime)
    }

    logger.info({ auctionAddress: result.address }, 'Auction created successfully');

    return result;
}

module.exports = {
    createAuction
}