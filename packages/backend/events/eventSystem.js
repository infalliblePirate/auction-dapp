import { registerAuctionSubscriber } from "./subscribers/auctoin.subscriber.js";
import { registerAuctionListener } from "./listeners/auction.listener.js";

export function registerEventSystem() {
    registerAuctionListener();
    registerAuctionSubscriber();
}