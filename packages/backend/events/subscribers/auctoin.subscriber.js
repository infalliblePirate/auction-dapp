import eventBus from "../core/eventBus.js";
import * as auctionRepo from "../../repositories/db/auction.repo.js";
import { logger } from "../../logger.js";

export function registerAuctionSubscriber() {
    eventBus.on("AuctionCreated", async (auction) => {
        try {
            await auctionRepo.save(auction);
            logger.info("Auction saved to DB:", auction.address);
        } catch (err) {
            logger.error("Failed to save auction:", err);
        }
    });
    logger.info("Auction subscriber registered");
}
