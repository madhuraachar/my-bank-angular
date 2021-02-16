import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import * as UserAction from './../../landing/store/user.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

//import { Account } from 'src/app/shared/card/card.model';


const BACKEND_URL = `${environment.url}/users`;

const handleAuthentication = (token: string, user: User) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user))
}

const clearStorage = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user')
}

const getAuthenticationInfo = () => {
    const token = sessionStorage.getItem('token')
    const user = JSON.parse(sessionStorage.getItem('user'))
    if(! token && ! user) {
        return
    }
    return {
        token,
        user
    }
}



@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private _snackBar: MatSnackBar){}

    @Effect()
    loginStart = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authStart: AuthActions.LoginStart) => {
            return this.http.post<{user: User, token: string}>(`${BACKEND_URL}/login`, authStart.payload).pipe(
                map(response => {
                    const user: User = {password: null, email: response.user.email, _id: response.user._id, dob: new Date(response.user.dob), name: response.user.name}
                    return new AuthActions.AuthSuccess({user, token: response.token})
                }),
                catchError(error => {
                    this.snackBarError('Authentication Failed')
                    return of(new AuthActions.AuthError('Login Failed'))
                })
            )
        })
    )

    @Effect()
    signupStart = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupData: AuthActions.SignupStart) => {
            return this.http.post<{ user: User, token: string}>(`${BACKEND_URL}`, signupData.payload).pipe(
                map(response => {
                    return new AuthActions.AuthSuccess({ user: response.user, token: response.token })
                }),
                catchError(error => {
                    this.snackBarError('Signup Error')
                    return of(new AuthActions.AuthError('Signup Error'))
                })
            )
        })
    )

    @Effect({dispatch: false})
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.AUTH_SUCCESS),
        switchMap((signup: AuthActions.AuthSuccess) => {
            const user: User = {...signup.payload.user}
            handleAuthentication(signup.payload.token, user);
            this.router.navigate(['/home'])
            return of()
        })
    )

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(()=> {
            const authInfo = getAuthenticationInfo();
            if (!authInfo) {
                return {type: 'Dummy'}
            }
            return new AuthActions.AuthSuccess({ user: authInfo.user, token: authInfo.token })
        })
    )

    @Effect()
    logout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        switchMap((logout: AuthActions.Logout)=>{
            clearStorage();
            this.router.navigate(['/auth'])
            return of(new UserAction.ClearDetails());
        })
    )

    private snackBarError(error) {
        this._snackBar.open(error, 'CLEAR', {
            duration: 5000
        })
    }
}