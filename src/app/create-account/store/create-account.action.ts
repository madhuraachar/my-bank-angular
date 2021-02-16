import { Action } from '@ngrx/store';
import { Account, Card } from './../../shared/card/card.model';

export const START_CREATE_ACCOUNT = '[Create Account] Start Create Account';
export const ACCOUNT_CREATED = '[Create Account] Account Created';
export const ACCOUNT_CREATE_FAIL = '[Create Account] Account Create Failed';

export const RESET_ALL = '[Create Account] Reset All';
export const BALANCE_UPDATE_START = '[Create Account] Balance Update Start';
export const BALANCE_UPDATE_SUCCESS = '[Create Account] Balance Update Success';
export const BALANCE_UPDATE_FAIL = '[Create Account] Balance Update Fail';

export const CREATE_CARD_START = '[Create Account] Create Card Start';
export const CREATE_CARD_SUCCESS = '[Create Account] Create Card Success';
export const CREATE_CARD_FAIL = '[Create Account] Create Card Fail';

export const UPDATE_CARD_AMOUNT_START = '[Create Account] Update Card Amount';
export const UPDATE_CARD_AMOUNT_SUCCESS = '[Create Account] Update Card Amount Success';
export const UPDATE_CARD_AMOUNT_FAIL = '[Create Account] Update Card Amount Fail';


export class ResetAll implements Action {
    readonly type = RESET_ALL
}

export class UpadteCardAmountStart implements Action {
    readonly type = UPDATE_CARD_AMOUNT_START;
    constructor(public payload: { updatingAmount: number, _id: string}){}
}

export class UpdateCardAmountFail implements Action {
    readonly type = UPDATE_CARD_AMOUNT_FAIL;
    constructor(public payload: string){}
}

export class UpadteCardAmountSuccess implements Action {
    readonly type = UPDATE_CARD_AMOUNT_SUCCESS;
    constructor(public payload: {updatedCard: Card}){}
}

export class CreateCardFail implements Action {
    readonly type = CREATE_CARD_FAIL;
    constructor(public payload: string) { }
}

export class CreateCardSuccess implements Action {
    readonly type = CREATE_CARD_SUCCESS;
    constructor(public payload: Card){}
}

export class CreateCardStart implements Action {
    readonly type = CREATE_CARD_START;
    constructor(public payload: Card){}
}

export class BalanceUpdateStart implements Action {
    readonly type = BALANCE_UPDATE_START;
    constructor(public payload: number){}
}
export class BalanceUpdateSuccess implements Action {
    readonly type = BALANCE_UPDATE_SUCCESS
}

export class BalanceUpdateFail implements Action {
    readonly type = BALANCE_UPDATE_FAIL;
    constructor(public payload: string){}
}

export class StartCreateAccount implements Action {
    readonly type = START_CREATE_ACCOUNT;
    constructor(public payload: Account){}
}

export class AccountCreated implements Action {
    readonly type = ACCOUNT_CREATED;
    constructor(public payload: Account){}
}

export class AccountCreateFail implements Action {
    readonly type = ACCOUNT_CREATE_FAIL
}




export type CreateAccountActions = StartCreateAccount | AccountCreated | AccountCreateFail | BalanceUpdateStart | BalanceUpdateSuccess | BalanceUpdateFail | ResetAll | CreateCardFail | CreateCardSuccess | CreateCardStart | UpadteCardAmountStart | UpdateCardAmountFail | UpadteCardAmountSuccess