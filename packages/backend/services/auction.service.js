const logger = require("../logger");
const { TransactionFailedError, EventNotFoundError } = require("../errors/errors");
const auctionRepo = require("../repositories/auction.repo");

async function createAuction({biddingTime}) {
    logger.info(biddingTime, "Creating auction via factory");

    const tx = await auctionRepo.createAuctionTx(biddingTime);
    const receipt = await tx.wait();

    if (receipt.status !== 1) {
        logger.error({ txHash: tx.hash }, "Auction creation transaction failed");
        throw new TransactionFailedError();
    }

    const event = auctionRepo.parseAuctionCreated(receipt);
    if (!event) {
        logger.error({ txHash: tx.hash }, "AuctionCreated event not found");
        throw new EventNotFoundError();
    }

    logger.info({ auctionAddress: event.address }, "Auction created successfully");
    return event;
}

module.exports = { createAuction };