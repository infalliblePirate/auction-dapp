import * as Auction from "../../models/auction.model.js";

async function save(auctionData) {
  return Auction.create(auctionData);
}

async function findAllActive() {
  return Auction.find({ ended: false }).sort({ createdAt: -1 });
}

async function findByAddress(address) {
  return Auction.findOne({ address });
}

async function markEnded(address) {
  return Auction.updateOne({ address }, { ended: true });
}

export {
  save,
  findAllActive,
  findByAddress,
  markEnded
};
