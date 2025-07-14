const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AuctionFactoryModule", (m) => {
  const auctionLogic = m.contract("Auction", [], { id: "AuctionImplementation" });
  const auctionFactory = m.contract("AuctionFactory", [auctionLogic]);
  return { auctionFactory };
});