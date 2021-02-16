import * as CreateAccount from './create-account.action';

export interface State {
    isError: boolean,
    isUpdateAccountError: boolean,
    popup: boolean,
}

export const initialState: State = {
    isError: false,
    isUpdateAccountError: false,
    popup: false
}

export function createAccountReducer(state: State = initialState, action: CreateAccount.CreateAccountActions) {
    switch (action.type) {
        case CreateAccount.START_CREATE_ACCOUNT:
            return {
                ...state,
                isError: false,
                popup: false
            }
        case CreateAccount.ACCOUNT_CREATED:
            return {
                ...state,
                isError: false,
                popup: true
            }
        case CreateAccount.ACCOUNT_CREATE_FAIL: {
            return {
                ...state,
                isError: true,
                popup: false
            }
        }
        case CreateAccount.BALANCE_UPDATE_START:
        case CreateAccount.CREATE_CARD_START: {
            return {
                ...state,
                isUpdateAccountError: false,
                popup: false
            }
        }
        case CreateAccount.BALANCE_UPDATE_SUCCESS:
        case CreateAccount.CREATE_CARD_SUCCESS:
        case CreateAccount.UPDATE_CARD_AMOUNT_SUCCESS: {
            return {
                ...state,
                isUpdateAccountError: false,
                popup: true
            }
        }
        case CreateAccount.BALANCE_UPDATE_FAIL: 
        case CreateAccount.CREATE_CARD_FAIL:
        case CreateAccount.UPDATE_CARD_AMOUNT_FAIL: {
            return {
                ...state,
                isUpdateAccountError: true,
                popup: false
            }
        }
        case CreateAccount.RESET_ALL: {
            return {
                ...state,
                isError: false,
                isUpdateAccountError: false,
                popup: false
            }
        }
        default: return state;
    }
}