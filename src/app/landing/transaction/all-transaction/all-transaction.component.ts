import { Component, OnInit, OnDestroy } from '@angular/core';
import { Transaction } from './../transaction.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from './../../../store/app.reducer'
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-all-transaction',
    templateUrl: './all-transaction.component.html',
    styleUrls: ['./all-transaction.component.scss']
})
export class AllTransactionComponent implements OnInit, OnDestroy {
    transactionList: Transaction[] = [];
    storeSub: Subscription;
    constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>){}
    ngOnInit(){
        this.storeSub = this.store.select('user').subscribe(userState=>{
            if(userState.transactions) {
                this.transactionList = userState.transactions
            }
        })
    }

    onSendMoney() {
        this.router.navigate(['new'], {relativeTo: this.route})
    }

    ngOnDestroy() {
        if(this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}