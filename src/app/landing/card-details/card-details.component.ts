import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as UserActions from './../store/user.actions';

@Component({
    selector: 'app-card-details',
    templateUrl: './card-details.component.html',
    styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit{
    
    constructor(private store: Store<fromApp.AppState>){}
    
    ngOnInit() {
        
    }

    onApplyNow() {
        this.store.dispatch(new UserActions.OpenUpdatePopup({type: 'CREATE_CARD'}))
    }
}