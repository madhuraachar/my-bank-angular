import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NAVIGATION_LIST } from 'src/app/shared/navigation';
import { Store } from '@ngrx/store';
import * as fromApp from './../../../../store/app.reducer';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recent-transaction',
    templateUrl: './recent-transaction.component.html',
    styleUrls: ['./recent-transaction.component.scss']
})
export class RecentTransactionComponent implements OnInit, OnDestroy{
    dataSource = [];
    storeSub: Subscription;
    constructor(private router: Router, private store: Store<fromApp.AppState>){}
    ngOnInit(){
        this.storeSub = this.store.select('user').pipe(map(userState => userState.transactions.filter(el => el.type === 'TRANSFER')))
        .subscribe(transaction => {
            if (transaction.length > 5) {
                this.dataSource = transaction.slice(0, 5)
            } else {
                this.dataSource = transaction
            }
        })
    }

    onAllTransaction() {
        this.router.navigate([`${NAVIGATION_LIST[3].icon}/${NAVIGATION_LIST[3].id}`])
    }

    ngOnDestroy() {
        if(this.storeSub) {
            this.storeSub.unsubscribe()
        }
    }
}