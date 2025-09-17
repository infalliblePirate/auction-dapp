import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema({
    address: { type: String, required: true },
    beneficiary: { type: String, required: true },
    biddingTime: { type: Number, required: true },
});

const Auction = mongoose.model('Auction', auctionSchema);
export { Auction };