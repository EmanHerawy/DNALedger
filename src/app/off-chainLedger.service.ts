import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class OffChainLedgerService {
    ledgerObservable: Observable<any[]>;
    private ledgerName = 'person';
    constructor(private db: AngularFireDatabase) {
    }
    getByID(id) {
        // return this.db.object('/person/' + id);
        return this.db.list(this.ledgerName, ref => ref.orderByChild('id').equalTo(id))
    }
    addToLedger(data) {
        const item = this.db.list(this.ledgerName);
        item.push(data);
    }
}