const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AuctionModule", (m) => {
    const duration = m.getParameter("duration", 40);
    const auction = m.contract("Auction", [duration]);
    return { auction };
})