import { Component, OnInit } from '@angular/core';
import { OffChainLedgerService } from '../../off-chainLedger.service';
import { IdentityLedgerService } from '../../identity-ledger.service';

@Component({
  selector: 'app-citizen-search',
  templateUrl: 'citizen-search.component.html'
})

export class CitizenSearchComponent implements OnInit {
  constructor(private service: IdentityLedgerService,
    private offChainService: OffChainLedgerService) { }

  ngOnInit() { }
  data = [];
  search(searchTerm) {
    console.log('search', searchTerm);
    this.service.getPersonDataByFingerPrint(searchTerm).then(s => {
      console.log(s);
    })
    this.service.getPersonDataByDna(searchTerm).then(s => {
      console.log(s);
    })
    this.service.getPersonDataById(searchTerm).then(s => {
      console.log(s);
    })
    this.service.getPersonDataByName(searchTerm).then(s => {
      console.log(s);
    })
  }
}
