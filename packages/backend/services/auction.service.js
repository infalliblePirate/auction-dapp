const path = require('path');
// Hardhat requires the current working directory to contain `hardhat.config.js`
// This file is in outside the Hardhat project, so we switch 
// the working directory to the onchain/ folder
// so that Hardhat can initialize properly
process.chdir(path.join(__dirname, '../../onchain'));

const hre = require('hardhat');
const AuctionModule = require('../../onchain/ignition/modules/Auction');

exports.deployAuction = async ({ duration }) => {

    const { auction } = await hre.ignition.deploy(AuctionModule, {
        parameters: {
            AuctionModule: {
                duration
            }
        }
    })

    const address = await auction.getAddress();
    console.log(`Auction deployed to: ${address}`)

    return address;
}