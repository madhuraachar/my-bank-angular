import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../../../store/app.reducer'
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Transaction } from '../transaction.model';

@Component({
    selector: 'app-transaction-success',
    templateUrl: './transaction-success.component.html',
    styleUrls: ['./transaction-success.component.scss']
})
export class TransactionSuccessComponent implements OnInit {
    transactionId = '';
    transactionDetails: Transaction;
    constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) {}
    ngOnInit() {
        this.transactionId = this.route.snapshot.params['id']
        this.store.select('user').pipe(map(userState => userState.transactions)).subscribe(transactions => {
            if(transactions.length > 0) {
                this.transactionDetails = transactions.find(el => el._id === this.transactionId)
            }
        })
    }
}