import { Component, OnInit } from '@angular/core';
import { Card } from './../../../shared/card/card.model';
import * as fromApp from './../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit{
    cardList: Observable<Card[]>;
    // = [
        
        // new Card('VISA', '1253654289547852', 'Debit Card'),
        // new Card('VISA', '8563295178529631', 'Credit Card'),
        // new Card('VISA', '1253658529547852', 'Debit Card')
    //]
    constructor(private store: Store<fromApp.AppState>) {}
    ngOnInit() {
        this.cardList = this.store.select('user').pipe(map(userState => userState.cards))
    }
}