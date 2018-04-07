import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffChainLedgerService } from '../../off-chainLedger.service';
import { Subscription } from 'rxjs/Subscription';
import { ICitizen } from '../citizen.interface';

@Component({
    selector: 'app-citizen',
    templateUrl: 'citizen.component.html'
})

export class CitizenComponent implements OnInit {
    citizen;
    id: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: OffChainLedgerService) { }


    ngOnInit() {
        // get id synchronously, don't need it more then once

        this.route.queryParams.subscribe(params => {
            this.id = params['id'];
            if (this.id != undefined) {
                console.log(this.id);
                this.service.getByID(this.id).valueChanges().subscribe(s => {
                    console.log(s, 'test');
                    this.citizen = s[0];
                })

            }
        });
    }


}