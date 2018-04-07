import { Injectable } from '@angular/core';
// const Web3 = require('web3');

const contract = require('truffle-contract');
const identityManager = require('../../build/contracts/IdentityManager.json');
declare global {
  interface Window { web3: any; }
}

window.web3 = window.web3 || {};
@Injectable()
export class IdentityLedgerService {

  account: any;
  accounts: any;
  web3: any;
  status: string;

  IdentityManager = contract(identityManager);

  constructor() {
    this.web3 = window.web3;
    console.log(this.web3);

    // this.checkAndInstantiateWeb3();


    this.onReady();
    this.getIssuer();
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
        console.log('instance', instance);

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
        console.log('createIdentity', parseInt(data.id, 10));
        console.log('instance', instance);

        meta = instance;
        return meta.createidentity.
          sendTransaction(parseInt(data.id, 10)
            ,
            //  data.firstName,
            //  data.datapath,
            // data.fingerPrint,
            data.dnaPrint,
            // data.fatherId,
            // data.motherId,
            {
              from: this.account, gas: 3000000
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
        return instance.changestatus.sendTransaction(status, {
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
        console.log('instance', instance);

        return instance.unfrozeauth.sendTransaction(address, { from: this.account, gas: 40000 });

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

  async getMemberDataByAddress() {
    console.log('getIssuer')
    let meta;
    let data;
    const result = await this.IdentityManager.deployed()
      .then((instance) => {
        // meta = instance;
        return instance.getMemberDataByAddress.call(this.account);
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
        console.log('.allEvents()', instance.allEvents());

        return instance.frozeauth.
          sendTransaction(address, { from: this.account, gas: 40000 });
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
