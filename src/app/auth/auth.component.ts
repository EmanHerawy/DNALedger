import { Component, OnInit } from '@angular/core';
import { IdentityLedgerService } from '../identity-ledger.service';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html'
})

export class AuthComponent implements OnInit {

  members = [];
  memberCount;
  constructor(private service: IdentityLedgerService) {
  }
  ngOnInit() {

    this.getmemberCount();
  }
  getMembers(index) {
    this.service.getMemberData(index).then(d => {
      console.log(d, 'members data');
      let data = { name: d[0], isActive: d[1], address: d[2] }
      this.members.push(data);
      console.log('rs', data);
      //this.members.push(d);
    })
  }
  getmemberCount() {
    this.service.getAuthoritiesCount().then(c => {
      console.log('count', c);
      this.memberCount = c;
      for (let index = 0; index < this.memberCount; index++) {
        this.getMembers(index);

      }
    })
  }

  changeStaus(status, address, index) {
    if (status) {
      this.service.frozeauth(address).then(s => {
        console.log(s)
        if (s) {
          this.members[index]['isActive'] = !status;
        } else {
          window.alert('error in save');

        }
      });
    } else {
      this.service.unfrozeauth(address).then(s => {
        console.log(s)
        if (s) {
          this.members[index]['isActive'] = !status;
        } else {
          window.alert('error in save');

        }
      });
    }
  }
}
