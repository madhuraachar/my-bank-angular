import { OnInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NAVIGATION_LIST } from 'src/app/shared/navigation';
import * as fromApp from './../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { Card } from 'src/app/shared/card/card.model';
import { Subscription, Observable, combineLatest  } from 'rxjs';

@Component({
    selector: 'app-account-section-a',
    templateUrl: './account-section-a.component.html',
    styleUrls: ['./account-section-a.component.scss']
})
export class AccountSectionAComponent implements OnInit, OnDestroy{
    card: Card;
    availableBalance = 0;
    name = "";
    userStore: Subscription;
    constructor(private router: Router, private store: Store<fromApp.AppState>) {}
    ngOnInit(){
        this.userStore = combineLatest([
            this.store.pipe(select('auth')),
            this.store.pipe(select('user'))
        ]).subscribe(([authState, userState]) => {
            if(userState.cards) {
                this.card = userState.cards[0]
            }
            if(userState.accounts) {
                this.availableBalance = 0;
                userState.accounts.forEach(el => this.availableBalance += el.amount)
            }
            if(authState.user) {
                this.name = authState.user.name
            }
        })
    }

    onViewBalance() {
        this.router.navigate([`/${NAVIGATION_LIST[1].icon}/${NAVIGATION_LIST[1].id }`])
    }

    ngOnDestroy() {
        if(this.userStore) {
            this.userStore.unsubscribe()
        }
    }
}