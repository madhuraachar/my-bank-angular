import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as AuthActions from './../store/auth.actions';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
    isLoading = false;
    storeSub: Subscription;
    constructor(private store: Store<fromApp.AppState>, private _snackBar: MatSnackBar){}

    ngOnInit() {
        this.storeSub = this.store.select('auth').pipe(
            map(authState => authState.error)
        ).subscribe(error => {
            if(error) {
                this.isLoading = false;
            }
        })
    }

    onSignup(form:NgForm) {
        if(form.invalid) {
            return
        }
        this.isLoading = true;
        this.store.dispatch(new AuthActions.SignupStart({ email: form.value.email, password: form.value.password, name: form.value.name}))
    }

    ngOnDestroy() {
        this.store.dispatch(new AuthActions.ClearAuthError())
        if(this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}