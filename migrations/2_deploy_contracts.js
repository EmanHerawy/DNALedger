var IdentityManager = artifacts.require("./IdentityManager.sol");

module.exports = function (deployer) {

  //deployer.deploy(IdentityManger);
  //deployer.link(IdentityManger, IdentityManager);
  deployer.deploy(IdentityManager, "Eman");
};
