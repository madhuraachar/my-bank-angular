import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Card } from './card.model';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as UserActions from './../../landing/store/user.actions';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy{
    @Input() card: Card;
    spentAmount = 0;
    storeSub: Subscription;
    constructor(private store: Store<fromApp.AppState>){}

    ngOnInit() {
        this.storeSub = this.store.select('user').pipe(map(userState => userState.cards )).subscribe(cards => {
            if(cards.length > 0) {
                const updatingCard = cards.find(el => el._id === this.card._id)
                this.spentAmount = (100 * updatingCard.spentAmount) / updatingCard.inCardAmount
            }
        })
    }

    onPayNow() {
        this.store.dispatch(new UserActions.OpenUpdatePopup({type: 'UPDATE_CARD', _id: this.card._id}))
    }

    ngOnDestroy() {
        if(this.storeSub) {
            this.storeSub.unsubscribe()
        }
    }
}