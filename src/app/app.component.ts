import { Component, OnInit } from '@angular/core';
import { canBeNumber } from '../util/validation';
import { IdentityLedgerService } from './identity-ledger.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



  constructor(private service: IdentityLedgerService) {
    // this.checkAndInstantiateWeb3();
    // this.onReady();
  }
  ngOnInit() {
    this.getMemberDataByAddress()
  }
  isAuth = true;
  getMemberDataByAddress() {
    // this.service.getMemberDataByAddress().then(s => {
    //   console.log(s, 'account data');

    // })
  }
}
