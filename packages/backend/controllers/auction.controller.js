const auctionService = require('../services/auction.service')

async function createAuction(req, res, next) {
    try {
        const auction = await auctionService.createAuction(req.body);
        res.status(201).json({ auction });
    } catch (error) {
        next(error);
    }
} 

module.exports = {
    createAuction
}