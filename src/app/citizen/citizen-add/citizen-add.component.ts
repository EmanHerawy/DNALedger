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
    // this.OffLedger.addToLedger("data").then(c => {
    //   console.log(c, 'test off')

    // });
    // this.OffLedger.getFromLedger("data").then(c => {
    //   console.log(c, 'test off get')

    // });
    // this.OffLedger.queryFromLedger().then(c => {
    //   console.log(c, 'test off queryFromLedger')

    // });

  }
  buildForm() {
    this.form = this.fb.group({
      //id: 0,
      _id: [21545124512, Validators.required],
      firstName: ['eceece', Validators.required],
      secondName: ['cececece', Validators.required],
      thirdName: ['eceeeeee', Validators.required],
      lastName: ['ceeeceecefsdf', Validators.required],
      bloodGroup: ['efefefefefefef', Validators.required],
      fullName: 'null',
      dateofBirth: ['efefefef', Validators.required],
      placeOfBirth: ['efefewfef', Validators.required],
      address: ['efewfwefwe', Validators.required],
      gender: [2, Validators.required],
      stauts: [1, Validators.required],
      fatherId: [57875124545, Validators.required],
      motherId: [245454545454, Validators.required],
      issuerAddress: null,
      issueDate: null,
      // forensicAddress: null,
      // forensicDate: null,
      dnaPrint: ['wfffkssdfjskdnfjnjndjnjencjncjenjnc', Validators.required],
      fingerPrint: ['eeffnekfnkenfknekngne', Validators.required],
      eyePrint: null
    });
  }
  save() {
    console.log('saved')
    let data = this.form.value;

    this.OffLedger.addToLedger(data).then(c => {
      console.log(c, 'test off')

    });
    //     this.OffLedger.addToLedger(data).then(c => {
    //   console.log(c, 'tes off edger');
    //   data.datapath = "c";
    //   data.dnaPrint = sha256(data.dnaPrint);
    //   data.fingerPrint = sha256(data.fingerPrint);
    //   this.service.createIdentity(data);

    // });
    data.datapath = "c";
    data.dnaPrint = sha256(data.dnaPrint);
    data.fingerPrint = sha256(data.fingerPrint);
    this.service.createIdentity(data);
  }
}
