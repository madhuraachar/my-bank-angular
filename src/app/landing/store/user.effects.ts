import  {Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as UserActions from './user.actions';
import * as CreateAccount from './../../create-account/store/create-account.action';
import { switchMap, map, catchError, take, exhaustMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Card, Account } from 'src/app/shared/card/card.model';
import { of } from 'rxjs';
import { Transaction } from '../transaction/transaction.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NAVIGATION_LIST } from 'src/app/shared/navigation';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import { CreateAccountComponent } from 'src/app/create-account/create-account.component';
import { MatDialog } from '@angular/material/dialog';

const BACKEND_URL = `${environment.url}`;
@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private http: HttpClient, private _snackBar: MatSnackBar, private router: Router, private store: Store<fromApp.AppState>, public dialog: MatDialog){}

    @Effect()
    loadDetails = this.actions$.pipe(
        ofType(UserActions.LOAD_DETAILS),
        switchMap((userDetails: UserActions.LoadDetails) => {
            return this.http.get<{ cards: Card[], accounts: Account[], transactions: Transaction[] }>(`${BACKEND_URL}/users/me`).pipe(
                map(response => {
                    return new UserActions.LoadDetailsSuccess({cards: response.cards, accounts: response.accounts,transactions: response.transactions})
                }),
                catchError(error => {
                    return of(new UserActions.LoadError('Unable to Fetch Details'))
                })
            )
        })
    )

    @Effect()
    transactionStart = this.actions$.pipe(
        ofType(UserActions.START_TRANSACTION),
        switchMap((transactionDetails: UserActions.TransactionStart)=>{
            const transaction: Transaction = {...transactionDetails.payload.transaction}
            return this.http.post<{ transaction: Transaction, error?: string}>(`${BACKEND_URL}/transaction`, transaction).pipe(
                map(response => {
                    console.log(response)
                    if(response.error) {
                        new UserActions.TransactionFail(response.error)
                    }
                    return new UserActions.TransactionSuccess({...response.transaction})
                }),
                catchError(error => {
                    return of(new UserActions.TransactionFail("Insufficient Balance"))
                })
            )
        })
    )

    @Effect()
    loadSuccess = this.actions$.pipe(
        ofType(UserActions.LOAD_DETAILS_SUCCESS),
        map(() => {
            return new UserActions.AfterLoad()
        })
    )

    @Effect({dispatch: false})
    afterLoaded = this.actions$.pipe(
        ofType(UserActions.AFTER_LOADED),
        switchMap((userDetails: UserActions.AfterLoad) => {
                //get store and check for account length
               return this.store.select('user').pipe(
                    take(1),
                    map(userState => {
                        if (userState.accounts.length === 0) {
                            this.createAccountModal({ type: 'CREATE_ACCOUNT'})
                        }
                    })
                )
        })
    )

    @Effect({dispatch: false})
    transactionFail = this.actions$.pipe(
        ofType(UserActions.TRANSACTION_FAIL),
        switchMap((snackbarError: UserActions.TransactionFail)=>{
            this.snackbarError("Insufficient Balance");
            return of()
        })
    )

    @Effect({dispatch: false})
    transactionSuccess = this.actions$.pipe(
        ofType(UserActions.TRANSACTION_SUCCESS),
        switchMap((userDetails: UserActions.TransactionSuccess) => {
            const id = userDetails.payload._id;    
            this.router.navigate([`${NAVIGATION_LIST[3].icon}`, 'swap_horizontal_circle', id, 'success'])
            return of()
        })
    )

    //open dialog to update balance
    @Effect({dispatch: false})
    openPopup = this.actions$.pipe(
        ofType(UserActions.OPEN_UPDATE_POPUP),
        switchMap((userDetails: UserActions.OpenUpdatePopup) => {
                this.createAccountModal(userDetails.payload)
                return of()
        })
    )

    //update account after balance
    @Effect()
    updateAccount = this.actions$.pipe(
        ofType(UserActions.ACCOUNT_UPDATED),
        map(()=>{
            return new CreateAccount.BalanceUpdateSuccess()
        })
    )


    private snackbarError(error) {
        this._snackBar.open(error, 'CLEAR', {
            duration: 5000
        })
    }

    private createAccountModal(info) {
        const {type, _id} = info
        const openDialog = this.dialog.open(CreateAccountComponent, 
            {
                disableClose: true,
                data: { type, _id}
            })
    }
}