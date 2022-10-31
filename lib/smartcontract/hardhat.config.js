require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const projectId = process.env.INFURA_PROJECT_ID
const privateKey = process.env.DEPLOYER_SIGNER_PRIVATE_KEY


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
    fuji: {
      url: `https://avalanche-fuji.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    }
  },
};
