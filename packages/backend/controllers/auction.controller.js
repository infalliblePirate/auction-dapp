import * as auctionService from '../services/auction.service.js';

async function createAuction(req, res, next) {
    try {
        const auction = await auctionService.createAuction(req.body);
        res.status(201).json({ auction });
    } catch (error) {
        next(error);
    }
} 

export { createAuction }