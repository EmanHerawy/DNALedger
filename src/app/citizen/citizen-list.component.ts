import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityLedgerService } from '../identity-ledger.service';

@Component({
    selector: 'app-citizen-list',
    templateUrl: 'citizen-list.component.html'
})

export class CitizenListComponent implements OnInit {
    constructor(private router: Router, private service: IdentityLedgerService) { }
    people = [];
    ngOnInit() { this.getpeopleNum() }
    getpeopleNum() {
        this.service.getPopulationCount().then(n => {
            if (n != undefined && n != null) {
                console.log(n);
                for (let index = 0; index < n; index++) {
                    this.getpeopleData(index)

                }
            }
        })
    }
    getpeopleData(index) {
        this.service.getPersonDataByIndex(index).then(n => {
            if (n != undefined && n != null) {

                console.log(n);
                let person = {};
                this.people.push(n)
            }

        })
    }
    onEdit(address) {
        this.router.navigate(['/add-auth'], { queryParams: { id: address } });
    }

}