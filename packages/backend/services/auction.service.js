import { logger } from '../logger.js';
import { TransactionFailedError, EventNotFoundError } from "../errors/errors.js";
import * as auctionRepo from "../repositories/auction.repo.js";

async function createAuction({biddingTime}) {
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

export { createAuction };