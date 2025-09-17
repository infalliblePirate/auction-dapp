import "../../logger";
import { factory, signer } from "../../config/blockchain";

async function createAuctionTx(biddingTime) {
    return factory.createAuction(biddingTime, await signer.getAddress());
}

function parseAuctionCreated(receipt) {
    if (!receipt || !receipt.logs) return null;

    const eventTopic = factory.interface.getEvent("AuctionCreated").topicHash;
    const auctionLog = receipt.logs.find((log) => log.topics[0] === eventTopic);

    if (!auctionLog) return null;

    try {
        const parsed = factory.interface.parseLog(auctionLog);
        return {
            address: parsed.args.clone,
            beneficiary: parsed.args.beneficiary,
            biddingTime: Number(parsed.args.biddingTime),
        };
    } catch (err) {
        logger.error({ err }, "Failed to parse AuctionCreated event:");
        return null;
    }
}


module.exports = { createAuctionTx, parseAuctionCreated };
