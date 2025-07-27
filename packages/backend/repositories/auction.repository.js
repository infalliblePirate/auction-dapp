const hre = require('../utils/hardhat.bootstrap');
const { TransactionFailedError, EventNotFoundError } = require('../errors/errors');

async function createAuction(factoryAddress, biddingTime, beneficiary) {
    const factory = await hre.ethers.getContractAt("AuctionFactory", factoryAddress);
    const tx = await factory.createAuction(biddingTime, beneficiary);
    const receipt = await tx.wait();

    if (receipt.status !== 1) {
        throw new TransactionFailedError();
    }

    const auctionCreatedEvents = receipt.logs.filter(log =>
        log.address.toLowerCase() === factoryAddress.toLowerCase() &&
        log.topics[0] === factory.interface.getEvent('AuctionCreated').topicHash
    );

    if (auctionCreatedEvents.length === 0) {
        throw new EventNotFoundError();
    }

    const event = factory.interface.parseLog(auctionCreatedEvents[0]);

    return {
        address: event.args.clone,
        beneficiary: event.args.beneficiary,
        biddingTime: Number(event.args.biddingTime)
    };
}

module.exports = {
    createAuction
}