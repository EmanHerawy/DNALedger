import { Component, OnInit } from '@angular/core';
import { OffChainLedgerService } from '../../off-chainLedger.service';
import { IdentityLedgerService } from '../../identity-ledger.service';
import { Router } from '@angular/router';
const sha256 = require('sha256');

@Component({
  selector: 'app-citizen-search',
  templateUrl: 'citizen-search.component.html'
})

export class CitizenSearchComponent implements OnInit {
  constructor(private service: IdentityLedgerService, private router: Router
    , private offChainService: OffChainLedgerService) { }

  ngOnInit() { }
  data = [];
  searchTerm: string = '';
  searchBy = 1;
  onShowCitizenData(id) {
    this.router.navigate(['/citizen-profile'], { queryParams: { id: id } });

  }
  onSearch() {
    console.log('search', this.searchTerm);
    console.log('searchBy', this.searchBy);
    if (this.searchTerm.length > 0) {
      //  if (this.searchBy == 2) {
      const searcSha = sha256(this.searchTerm);
      this.service.getPersonDataByDna(searcSha).then(s => {
        let item = { id: s.c[0] };
        console.log(item, 'item');
        console.log(s.c[0], 'test');

        this.data.push(item);
      })
      // } else {
      //   this.service.getPersonDataById(this.searchTerm).then(s => {
      //     let item = { id: s.c[0] };
      //     console.log(item, 'item');
      //     console.log(s.c[0], 'test');

      //     this.data.push(item);

      //   })
    }
  }
}

