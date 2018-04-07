import { IdentityLedgerService } from './../../identity-ledger.service';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OffChainLedgerService } from '../../off-chainLedger.service';
const sha256 = require('sha256');

@Component({
  selector: 'app-citizen-add',
  templateUrl: 'citizen-add.component.html'
})

export class CitizenAddComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder,
    private service: IdentityLedgerService, private OffLedger: OffChainLedgerService) { }

  ngOnInit() {
    this.buildForm();
    // this.OffLedger.testget().then(s => {
    //   console.log(s);

    // })
  }
  buildForm() {
    this.form = this.fb.group({
      //id: 0,
      id: [null, Validators.required],
      firstName: [null, Validators.required],
      secondName: [null, Validators.required],
      thirdName: [null, Validators.required],
      lastName: [null, Validators.required],
      bloodGroup: [null, Validators.required],
      dateofBirth: [null, Validators.required],
      placeOfBirth: [null, Validators.required],
      address: [null, Validators.required],
      gender: [null, Validators.required],
      stauts: [null, Validators.required],
      fatherId: [null, Validators.required],
      motherId: [null, Validators.required],
      issuerAddress: null,
      issueDate: null,
      saveInDb: true,
      // forensicAddress: null,
      // forensicDate: null,
      dnaPrint: [null, Validators.required],
      // fingerPrint: ['eeffnekfnkenfknekngne', Validators.required],
      // eyePrint: null
    });
  }
  save() {
    let data = this.form.value;
    let offData = Object.assign({}, this.form.value);
    console.log('saved', offData)


    data.dnaPrint = sha256(data.dnaPrint);
    if (!data.saveInDb) {
      offData.dnaPrint = null;
    }
    this.service.createIdentity(data).then(s => {
      console.log(s, 'saved to blcokchain');
      this.OffLedger.addToLedger(offData)
      alert('saved');
      this.form.reset();
    });

    // data.datapath = "c";
    // data.dnaPrint = sha256(data.dnaPrint);
    // // data.fingerPrint = sha256(data.fingerPrint);
    // this.service.createIdentity(data);
  }
}
