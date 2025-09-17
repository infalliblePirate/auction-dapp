import express from 'express';
import * as auctionController from '../controllers/auction.controller.js';
const router = express.Router();

router.post('/auction', auctionController.createAuction)

export { router };