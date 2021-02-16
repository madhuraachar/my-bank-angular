import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NAVIGATION_LIST } from 'src/app/shared/navigation';
import { NavigationService } from 'src/app/shared/navigation.service';
import * as fromApp from './../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as UserActions from './../store/user.actions';
@Component({
    selector: 'app-balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit, OnDestroy{
    availableBalance = 0;
    oneTrasactionName = null;
    storeSub: Subscription;
    constructor(private router: Router, private navigationService: NavigationService, private store: Store<fromApp.AppState>){}
    ngOnInit(){
        this.storeSub = this.store.select('user').pipe(map(userState => userState)).subscribe(userState => {
            if(userState.accounts.length > 0) this.availableBalance = userState.accounts[0].amount;
            
            if(userState.transactions.length > 0 ) {
                this.oneTrasactionName = userState.transactions[0].name;
            }
        })
    }
    
    sendOrRequestMoney() {
        this.router.navigate([`${NAVIGATION_LIST[3].icon}/${NAVIGATION_LIST[3].id}/new`])
    }

    onAllTransaction() {
        this.router.navigate([`${NAVIGATION_LIST[3].icon}/${NAVIGATION_LIST[3].id}`])
    }

    onSendAgain() {
        this.router.navigate([`${NAVIGATION_LIST[3].icon}/${NAVIGATION_LIST[3].id}`, '0', 'new'])
    }

    onAccountHome() {
        this.navigationService.onNavigateOption(NAVIGATION_LIST[0]);
    }

    onAddBalance() {
        this.store.dispatch(new UserActions.OpenUpdatePopup({type: 'UPDATE_ACCOUNT'}))
    }

    ngOnDestroy() {
        if(this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}