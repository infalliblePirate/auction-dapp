import { registerAuctionSubscriber } from "./subscribers/auction.subscriber.js";
import { registerAuctionListener } from "./listeners/auction.listener.js";

export function registerEventSystem() {
    registerAuctionListener();
    registerAuctionSubscriber();
}