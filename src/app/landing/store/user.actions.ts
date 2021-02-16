import { Action } from '@ngrx/store';
import { Card, Account } from 'src/app/shared/card/card.model';
import { Transaction } from '../transaction/transaction.model';

export const CLEAR_DETAILS = '[User] Clear Details';

export const LOAD_DETAILS = '[User] Load Details';
export const LOAD_DETAILS_SUCCESS = '[User] Load Details Success';
export const LOAD_ERROR = '[User] Load Error';
export const AFTER_LOADED = '[User] After Loaded';

export const START_TRANSACTION = '[User] Start Transaction';
export const TRANSACTION_SUCCESS = '[User] Transaction Success';
export const TRANSACTION_FAIL = '[User] Transaction Fail';

export const ADD_ACCOUNT = '[User] Add Account';

export const ACCOUNT_UPDATED = '[User] Account Updated';
export const OPEN_UPDATE_POPUP = '[User] Open Update Popup';

export const ADD_NEW_CARD = '[User] Add New Card'

export const UPDATE_CARD = '[User] Update Card';

export class UpdateCard implements Action {
    readonly type = UPDATE_CARD;
    constructor(public payload: {updatedCard: Card}) {}
}

export class AddNewCard implements Action {
    readonly type = ADD_NEW_CARD;
    constructor(public payload: { card: Card}) {}
}

export class OpenUpdatePopup implements Action {
    readonly type = OPEN_UPDATE_POPUP;
    constructor(public payload: {type: string, _id?: string}){}
}

export class AccountUpdated implements Action {
    readonly type = ACCOUNT_UPDATED;
    constructor(public payload: Account){}
}


export class LoadDetails implements Action {
    readonly type = LOAD_DETAILS;
}

export class LoadDetailsSuccess implements Action {
    readonly type = LOAD_DETAILS_SUCCESS;
    constructor(public payload: { cards: Card[], accounts: Account[], transactions: Transaction[]}){}
}

export class LoadError implements Action {
    readonly type = LOAD_ERROR;
    constructor(public payload: string){}
}

export class ClearDetails implements Action {
    readonly type = CLEAR_DETAILS;
}

export class AfterLoad implements Action {
    readonly type = AFTER_LOADED
}

export class AddAccount implements Action {
    readonly type = ADD_ACCOUNT
    constructor(public payload: Account){}
}

export class TransactionStart implements Action {
    readonly type = START_TRANSACTION;
    constructor(public payload: { transaction: Transaction }) { }
}

export class TransactionSuccess implements Action {
    readonly type = TRANSACTION_SUCCESS;
    constructor(public payload: Transaction) { }
}

export class TransactionFail implements Action {
    readonly type = TRANSACTION_FAIL;
    constructor(public payload: string) { }
}


export type UserActions = LoadDetails | LoadDetailsSuccess | LoadError | ClearDetails | TransactionStart | TransactionSuccess | TransactionFail | AfterLoad | AddAccount | AccountUpdated | OpenUpdatePopup | AddNewCard | UpdateCard