import { factoryWs } from "../../config/blockchain.js";
import eventBus from "../core/eventBus.js";
import { logger } from "../../logger.js";

export function registerAuctionListener() {
  factoryWs.on("AuctionCreated", (auctionAddress, beneficiary, biddingTime) => {
    logger.info("Blockchain AuctionCreated detected", { auctionAddress });

    eventBus.emit("AuctionCreated", {
      address: auctionAddress,
      beneficiary,
      biddingTime: Number(biddingTime),
    });
  });

  logger.info("AuctionFactory listener registered");
}
