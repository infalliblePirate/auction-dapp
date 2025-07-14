/**
 * Hardhat requires the current working directory to contain `hardhat.config.js`,
 * and must know which network to use via `HARDHAT_NETWORK`.
 *
 * This module ensures proper initialization of Hardhat from outside the `onchain/` project directory.
 *
 * Usage: Import this module instead of 'hardhat' directly in any service:
 * const hre = require('../utils/hardhat');
 */

const path = require('path');

const hardhatDir = path.resolve(__dirname, '../../onchain');
if (process.cwd() !== hardhatDir) {
    process.chdir(hardhatDir);
}

if (!process.env.HARDHAT_NETWORK) {
    process.env.HARDHAT_NETWORK = 'bnb';
}

const hre = require('hardhat');

module.exports = hre;