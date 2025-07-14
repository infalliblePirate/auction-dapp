const hre = require('../utils/hardhat.bootstrap');
const { TransactionFailedError, EventNotFoundError } = require('../errors/errors');

async function createAuction({ biddingTime }) {
  const [deployer] = await hre.ethers.getSigners();
  const beneficiary = deployer.address;

  const factoryAddress = "0xCdE8F1B0933f4b9EeF475b8C0A9FCda0c5C160e2";
  const factory = await hre.ethers.getContractAt("AuctionFactory", factoryAddress);

  const tx = await factory.createAuction(biddingTime, beneficiary);
  const receipt = await tx.wait();

  if (receipt.status !== 1) {
    throw new TransactionFailedError();
  }

  const auctionCreatedEvents = receipt.logs.filter(log => {
    return log.address.toLowerCase() === factoryAddress.toLowerCase() &&
      log.topics[0] === factory.interface.getEvent('AuctionCreated').topicHash;
  });

  const auctionCreatedEvent = factory.interface.parseLog(auctionCreatedEvents[0]);

  if (!auctionCreatedEvent) {
    throw new EventNotFoundError();
  }

  const [auctionAddress, eventBeneficiary, eventBiddingTime] = auctionCreatedEvent.args;

  console.log(`Auction created successfully at address: ${auctionAddress}`);

  return {
    auctionAddress: auctionAddress,
    beneficiary: eventBeneficiary,
    biddingTime: Number(eventBiddingTime)
  };
};

module.exports = {
  createAuction
}
