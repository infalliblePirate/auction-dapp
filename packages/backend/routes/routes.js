const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auction.controller')

router.post('/auction', auctionController.createAuction)

module.exports = router;