import { Effect, Actions, ofType } from '@ngrx/effects';
import * as CreateAction from './create-account.action';
import { switchMap, map, catchError, take, exhaustMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Account, Card } from './../../shared/card/card.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as UserActions from './../../landing/store/user.actions';
import { of } from 'rxjs';
import { CreateAccountComponent } from '../create-account.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';

const BACKEND_URL = environment.url

@Injectable()
export class CreateAccountEffect {

    @Effect()
    createAccount = this.actions$.pipe(
        ofType(CreateAction.START_CREATE_ACCOUNT),
        switchMap((createAccount: CreateAction.StartCreateAccount) => {
            const account: Account = {...createAccount.payload}
            return this.http.post<{ account: Account }>(`${BACKEND_URL}/accounts`, account).pipe(
                map((response) => {
                    return new CreateAction.AccountCreated(response.account); 
                }),
                catchError(error => {
                    return of(new CreateAction.AccountCreateFail())
                })
            )
        })
    )


    @Effect()
    accountCreated = this.actions$.pipe(
        ofType(CreateAction.ACCOUNT_CREATED),
        switchMap((createAccount: CreateAction.AccountCreated) => {
            this.router.navigate(['/home'])
            return of(new UserActions.AddAccount(createAccount.payload))
        })
    )

    @Effect({ dispatch: false })
    accountCreateFail = this.actions$.pipe(
        ofType(CreateAction.ACCOUNT_CREATE_FAIL),
        map(() => {
            this.snackbarError('Unale to add Balance')
        })
    )


    // start update balance
    @Effect()
    startUpdateBalance = this.actions$.pipe(
        ofType(CreateAction.BALANCE_UPDATE_START),
        switchMap((createAccount: CreateAction.BalanceUpdateStart) => {
            return this.store.select('user').pipe(
                take(1),
                map(userState => userState.accounts[0]._id),
                exhaustMap(id => {
                    const req = { amount: createAccount.payload }
                    return this.http.patch<{ account: Account }>(`${BACKEND_URL}/accounts/${id}`, req).pipe(
                        map(response => {
                            return new UserActions.AccountUpdated(response.account)
                        }),
                        catchError(error => {
                            return of(new CreateAction.BalanceUpdateFail('Unable to update'))
                        })
                    )
                })
            )
        })
    )

    @Effect({dispatch: false})
    updateBalanceFail = this.actions$.pipe(
        ofType(CreateAction.BALANCE_UPDATE_FAIL),
        map(()=>{
            this.snackbarError('Unable to update Balance')
        })
    )

    // create card
    @Effect()
    createCard = this.actions$.pipe(
        ofType(CreateAction.CREATE_CARD_START),
        switchMap((createAccount: CreateAction.CreateCardStart) => {
            const card: Card = createAccount.payload
            return this.http.post<{card: Card}>(`${BACKEND_URL}/cards`, card).pipe(
                map(response => {
                    return new CreateAction.CreateCardSuccess( response.card);
                }),
                catchError(error => {
                    return of(new CreateAction.CreateCardFail('Unable to Create Card'))
                })
            )
        })
    )

    @Effect()
    cardSuccess = this.actions$.pipe(
        ofType(CreateAction.CREATE_CARD_SUCCESS),
        switchMap((createAccount: CreateAction.CreateCardStart) => {
            const card: Card = createAccount.payload
            return of(new UserActions.AddNewCard({ card }));
        })
    )

    @Effect({dispatch: false})
    cardCreateFail = this.actions$.pipe(
        ofType(CreateAction.CREATE_CARD_FAIL),
        switchMap((createAccount: CreateAction.CreateCardFail) => {
            this.snackbarError(createAccount.payload);
            return of()
        })
    )

    @Effect()
    cardAmountUpdate = this.actions$.pipe(
        ofType(CreateAction.UPDATE_CARD_AMOUNT_START),
        switchMap((createAccount: CreateAction.UpadteCardAmountStart) => {
            const _id = createAccount.payload._id;
            const req = { updatingAmount: createAccount.payload.updatingAmount}
            return this.http.patch<{card: Card}>(`${BACKEND_URL}/cards/${_id}`, req).pipe(
                map(response => {
                    console.log(response)
                    return new CreateAction.UpadteCardAmountSuccess({updatedCard: response.card})
                }),
                catchError(error => {
                    return of(new CreateAction.UpdateCardAmountFail('Unable to add amount'))
                })
            )
        })
    )

    @Effect()
    cardUpdateSUccess = this.actions$.pipe(
        ofType(CreateAction.UPDATE_CARD_AMOUNT_SUCCESS),
        switchMap((createAccount: CreateAction.UpadteCardAmountSuccess) => {
            return of(new UserActions.UpdateCard({ updatedCard: createAccount.payload.updatedCard }))
        })
    )

    @Effect({dispatch: false})
    cardUpdateFail = this.actions$.pipe(
        ofType(CreateAction.UPDATE_CARD_AMOUNT_FAIL),
        switchMap((createAccount: CreateAction.UpdateCardAmountFail) => {
            this.snackbarError(createAccount.payload);
            return of();
        })
    )



    private snackbarError(error) {
        this._snackBar.open(error, 'CLEAR', {
            duration: 5000
        })
    }


    constructor(private actions$: Actions, private http: HttpClient, private router: Router, public dialog: MatDialog, private store: Store<fromApp.AppState>, private _snackBar: MatSnackBar){}
}