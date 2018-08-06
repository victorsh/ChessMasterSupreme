var ChessMasterSupreme = artifacts.require("./ChessMasterSupreme.sol");

module.exports = async function(deployer) {
  await deployer.deploy(ChessMasterSupreme, "ChessMasterSupreme", "CMS");
  const chessMasterSupreme = await ChessMasterSupreme.deployed();
};