import { Injectable } from '@angular/core';
const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');
const docLedgerName = 'dna-doc-ledger';
const docLedgertype = 'docs';
const accessPrevladge = '*'
const ipfsOptions = {
    EXPERIMENTAL: {
        pubsub: true
    },
};

// Create IPFS instance
const ipfs = new IPFS(ipfsOptions)
const orbitdb = new OrbitDB(ipfs)

@Injectable()
export class OffChainLedgerService {
    ledger: any;
    constructor() {
        this.docDbInit();
    }
    async docDbInit() {
        return ipfs.on('ready', async () => {
            // Create OrbitDB instance
            console.log('docDbInit')
            return await
                this.databaseInitialzer(docLedgerName,
                    docLedgertype, accessPrevladge).then(d => {
                        console.log(d, 'db')
                        this.ledger = d;
                        console.log(this.ledger, ' this.ledger')

                        return d;
                    });
        })

    }
    async databaseInitialzer(name, type, access) {

        //     console.log('databaseInitialzer')


        return orbitdb.docstore(name, {
            // If database doesn't exist, create it
            create: true,
            overwrite: true,
            // Load only the local version of the database, 
            // don't load the latest from the network yet
            localOnly: false,
            // If "Public" flag is set, allow anyone to write to the database,
            // otherwise only the creator of the database can write
            write: access ? ['*'] : [],
        })
        //  console.log(db, 'dbinit zer')

        //return db;
    }
    async  addToLedger(dataItem) {
        console.log('addToLedger', dataItem)

        ipfs.on('ready', async () => {
            // Create OrbitDB instance
            return await
                this.databaseInitialzer(docLedgerName,
                    docLedgertype, accessPrevladge).then(d => {
                        console.log(d, 'db')
                        console.log(dataItem, 'dataItem')
                        this.ledger = d;
                        console.log(this.ledger, ' this.ledger')
                        d.put({
                            _id: dataItem._id,
                            firstName: dataItem.firstName,
                            secondName: dataItem.secondName,
                            thirdName: dataItem.thirdName,
                            lastName: dataItem.lastName,
                            fullName: dataItem.fullName,
                            dateofBirth: dataItem.dateofBirth,
                            placeOfBirth: dataItem.placeOfBirth,
                            address: dataItem.address,
                            gender: dataItem.gender,
                            stauts: dataItem.stauts,
                            fatherId: dataItem.fatherId,
                            motherId: dataItem.motherId,
                            issuerAddress: dataItem.issuerAddress,
                            issueDate: dataItem.issueDate,
                            dnaPrint: dataItem.dnaPrint,
                            fingerPrint: dataItem.fingerPrint
                        })
                            .then(() => d.get(dataItem._id))
                            .then((value) => console.log(value, 'test put '))
                    });
        })
        // return ipfs.on('ready', () => {
        //     //  const orbitdb = new OrbitDB(ipfs)
        //     orbitdb.docstore(docLedgerName)
        //         .then((docstore) => {
        //             docstore.put({ _id: 'hello world', test: 10, tex: 'all the things' })
        //                 .then(() => docstore.get('hello'))
        //                 .map((e) => e.payload.value)
        //                 .then((value) => {
        //                     console.log(value)
        //                     return value;
        //                 })
        //             // [{ _id: 'hello world', doc: 'all the things'}]
        //         })


        // })

        // //Database is Ready... Do stuff..
        // const all = this.ledger.query((doc) => doc.followers >= 5)
        // console.log(all)
        // this.ledger.put({ _id: 'QmAwes345345fsdfdf2', name: 'dsdfdfq34ffs2', followers: 222 }).then((hash) => {
        //     console.log('put:' + hash);
        //     orbitdb._pubsub.publish(this.ledger.dbname, this.ledger._oplog.heads)
        // })
    }
    searchbyName(name) {
        const data = this.docDbInit().then(async db => {

            return orbitdb.query((doc) => doc.name == name)
        })
        return data;
    }
    async getFromLedger(id) {
        ipfs.on('ready', async () => {
            // Create OrbitDB instance
            console.log('docDbInit')
            return await
                this.databaseInitialzer(docLedgerName,
                    docLedgertype, accessPrevladge).then(d => {
                        console.log(d, 'db')
                        return d;
                    }).then((data) => {
                        this.ledger = data;
                        console.log(this.ledger, ' this.ledger')
                        data.get('hello')
                            .then((value) => console.log(value))
                    });
        })

    }
    async queryFromLedger() {
        ipfs.on('ready', () => {
            //  const orbitdb = new OrbitDB(ipfs)
            return orbitdb.docstore(docLedgerName)
                .then((db) => {
                    db.query((doc) => doc.test >= 1).then(s => {
                        console.log(s, 'get')
                        return s
                    })
                    // [{ _id: 'hello world', doc: 'all the things'}]
                })


        })
        ipfs.on('ready', async () => {
            // Create OrbitDB instance
            console.log('docDbInit')
            return await
                this.databaseInitialzer(docLedgerName,
                    docLedgertype, accessPrevladge).then(db => {
                        db.query((doc) => doc.test >= 1).then(s => {
                            console.log(s, 'query')
                            return s
                        })
                    });
        })

    }
}