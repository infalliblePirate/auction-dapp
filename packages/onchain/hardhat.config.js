require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    bnb: { // test
      url: process.env.BNB_TEST_URL,
      chainId: 97,
      accounts: {
        mnemonic: process.env.MNEMONIC
      }
    }
  }
};
