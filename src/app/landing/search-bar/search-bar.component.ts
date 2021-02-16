import {Component} from '@angular/core';
import * as AuthActions from './../../auth/store/auth.actions';
import * as fromApp from './../../store/app.reducer';
import { Store } from '@ngrx/store';
@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
    constructor(private store: Store<fromApp.AppState>){}

    onLogout() {
        this.store.dispatch(new AuthActions.Logout())
    }
}