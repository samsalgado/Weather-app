/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-waffle');
const INFURA_URL = 'https://kovan.infura.io/v3/99b84a63ee374921b1f26db07b3e7d73';
const PRIVATE_KEY = '7ef15be65184ed5a15c82dd11aa5fdf5fe93b59e05d2c66c2d59186918a628eb';
module.exports = {
  solidity: "0.8.13",
  networks: {
    kovan: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
