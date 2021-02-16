import * as fromAuth from './../auth/store/auth.reducers';
import * as fromUser from './../landing/store/user.reducers';
import * as fromCreateAccount from './../create-account/store/create-account.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    auth: fromAuth.State,
    user: fromUser.State,
    createAccount: fromCreateAccount.State
}

export const appReducer:ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer, user: fromUser.userReducer, createAccount: fromCreateAccount.createAccountReducer
}