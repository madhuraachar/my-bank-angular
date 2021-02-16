import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as AuthActions from './../store/auth.actions';
import * as fromApp from './../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountComponent } from './../../create-account/create-account.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    isLoading = false;
    storeSub: Subscription;
    constructor(private store: Store<fromApp.AppState>, public dialog: MatDialog){}

    ngOnInit() {
        this.storeSub = this.store.select('auth').pipe(
            map(authState => authState.error)
        ).subscribe(error => {
            if(error) {
                this.isLoading = false;
            }
        })
    }

    onLogin(form:NgForm){
        if(form.invalid) {
            return;
        }
        this.isLoading = true;
        this.store.dispatch(new AuthActions.LoginStart({email: form.value.email, password: form.value.password}))
        
    }

    ngOnDestroy() {
        this.store.dispatch(new AuthActions.ClearAuthError())
        if(this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}