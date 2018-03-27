import { Injectable } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
const identityManager = require('../../build/contracts/IdentityManager.json');

@Injectable()
export class IdentityLedgerService {

  account: any;
  accounts: any;
  web3: any;
  status: string;

  IdentityManager = contract(identityManager);

  constructor() {
    this.checkAndInstantiateWeb3();
    this.onReady();
    this.getIssuer();
  }
  checkAndInstantiateWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof this.web3 !== 'undefined') {
      console.warn('Using web3 detected from external source. If you find that your accounts don\'t appear or you have ' +
        '0 IdentityManager, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel ' +
        'free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask');
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(this.web3.currentProvider);
    } else {
      console.warn('No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when ' +
        'you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info ' +
        'here: http://truffleframework.com/tutorials/truffle-and-metamask');
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
  }
  getMembers() {
    console.log('authorities')
    let meta;
    this.IdentityManager.deployed()
      .then((instance, error) => {
        // meta = instance;
        //   console.log(instance);
      });
  }
  onReady() {
    // Bootstrap the IdentityManager abstraction for Use.
    this.IdentityManager.setProvider(this.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }
      this.accounts = accs;
      this.account = this.accounts[0];
      console.log('this.account', this.account);
      //  this.refreshBalance();
    });
  }
  setStatus(message: string) {
    this.status = message;
  }
  async  addAuthMember(name: string, newAccount: string) {
    let meta;
    const result = await this.IdentityManager.deployed()
      .then((instance) => {
        console.log('addAuthMember')

        meta = instance;
        return meta.addauth(newAccount, name, {
          from: this.account, gas: 200000
        });
      })
      .then((res) => {
        console.log('addAuthMember', res)

        this.setStatus('Transaction complete!');
        return res;
      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }

  async createIdentity(data) {

    let meta;
    const result = await this.IdentityManager.deployed()
      .then((instance) => {
        console.log('createIdentity', parseInt(data._id, 10));

        meta = instance;
        return meta.createidentity(parseInt(data._id, 10),
          data.firstName,
          data.datapath,
          data.fingerPrint,
          data.dnaPrint,
          data.fatherId,
          data.motherId,
          {
            from: this.account, gas: 630999
          });
      })
      .then((res) => {
        console.log('createIdentity', res)
        this.setStatus('Transaction complete!');
        return res;
      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  // died alive lost
  async changestatus(status) {
    console.log('getIssuer')
    let meta;
    let data;
    const result = await this.IdentityManager.deployed()
      .then((instance) => {
        // meta = instance;
        return instance.changestatus.call(status, {
          from: this.account, gas: 3000000
        });
      })
      .then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }

  async getAuthoritiesCount() {
    console.log('getIssuer')
    let meta;
    let data;
    const result = await this.IdentityManager.deployed()
      .then((instance) => {
        // meta = instance;
        return instance.getAuthoritiesCount.call();
      })
      .then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  async getPopulationCount() {
    console.log('getIssuer')
    let meta;
    let data;
    const result = await this.IdentityManager.deployed()
      .then((instance) => {
        // meta = instance;
        return instance.population.call();
      })
      .then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  async unfrozeauth(address) {
    console.log(' unfrozeauth(address) ', address)
    let meta;
    let data;
    const result = await this.IdentityManager.deployed()
      .then((instance) => {
        // meta = instance;
        return instance.unfrozeauth.call(address, {
          from: this.account, gas: 40000


        });
      })
      .then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }

  async getMemberData(index) {
    console.log('getIssuer')
    let meta;
    let data;
    const result = await this.IdentityManager.deployed()
      .then((instance) => {
        // meta = instance;
        return instance.getMemberData.call(index);
      })
      .then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  async getPersonDataById(id) {
    console.log('getIssuer')
    let meta;
    let data;
    const result = await this.IdentityManager.deployed()
      .then((instance) => {
        // meta = instance;
        return instance.getPersonDataById.call(id);
      })
      .then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  async frozeauth(address) {

    console.log('getIssuer')
    let meta;
    let data;

    const result = await this.IdentityManager.deployed()
      .then((instance) => {
        // meta = instance;
        console.log('address', address);

        return instance.frozeauth.call(address,
          {
            from: this.account, gas: 40000

          });
      })
      .then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  async getPersonDataByIndex(index) {
    console.log('index', index)
    let meta;
    let data;
    const result = await this.IdentityManager.deployed()
      .then((instance) => {
        // meta = instance;
        console.log('index', instance)

        return instance.getPersonDataByIndex.call(index);
      })
      .then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  async getPersonDataByName(name) {
    console.log('getIssuer')
    let meta;
    let data;
    const result = await this.IdentityManager.deployed()
      .then((instance) => {
        // meta = instance;
        return instance.getPersonDataByName.call(name);
      })
      .then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }

  async getPersonDataByDna(dna) {
    console.log('getIssuer')
    let meta;
    let data;
    const result = await this.IdentityManager.deployed()
      .then((instance) => {
        // meta = instance;
        return instance.getPersonDataByDna.call(dna);
      })
      .then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  async getPersonDataByFingerPrint(fingerHex) {
    console.log('getIssuer')
    let meta;
    let data;
    const result = await this.IdentityManager.deployed()
      .then((instance) => {
        // meta = instance;
        return instance.getPersonDataByFingerPrint.call(fingerHex);
      })
      .then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }

  async getIssuer() {
    console.log('getIssuer')
    let meta;
    let data;
    const result = await this.IdentityManager.deployed()
      .then((instance) => {
        // meta = instance;
        return instance.Issuer.call();
      })
      .then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }

}
