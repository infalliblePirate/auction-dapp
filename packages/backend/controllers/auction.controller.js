const auctionService = require('../services/auction.service')

async function createAuction(req, res) {
    try {
        const deployedAddr = await auctionService.createAuction(req.body);
        res.status(201).json({ "address": deployedAddr });
    } catch (error) {
        console.error('Auction deployment failed:', error);
        res.status(500).json(error.message);
    }
} 

module.exports = {
    createAuction
}