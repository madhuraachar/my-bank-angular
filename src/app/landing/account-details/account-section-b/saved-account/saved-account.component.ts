import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../../../../store/app.reducer';
import { Transaction } from './../../../transaction/transaction.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-saved-account',
    templateUrl: './saved-account.component.html',
    styleUrls: ['./saved-account.component.scss']
})
export class SavedAccountComponent implements OnInit{
    savedAccounts: Observable<Transaction[]>;
    constructor(private store: Store<fromApp.AppState>){}
    ngOnInit(){
        this.savedAccounts = this.store.select('user').pipe(map(userState => userState.transactions.filter(el => el.type === 'SAVE')))
    }

}