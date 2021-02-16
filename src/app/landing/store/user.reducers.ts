import { Card, Account } from './../../shared/card/card.model';
import * as UserActions from './user.actions';
import { Transaction } from '../transaction/transaction.model';


export interface State {
    cards: Card[];
    accounts: Account[];
    transactions: Transaction[];
    transactionError: string;
}

const initState: State = {
    cards: [],
    accounts: [],
    transactions: [],
    transactionError: null
}

export function userReducer(state: State = initState, action: UserActions.UserActions) {
    switch (action.type) {
        case UserActions.LOAD_DETAILS_SUCCESS: 
            return {
                ...state,
                cards: [...action.payload.cards],
                accounts: [...action.payload.accounts],
                transactions: [...action.payload.transactions]
            }
        case UserActions.CLEAR_DETAILS: 
            return {
                ...state,
                cards: [],
                accounts: [],
                transactions: [],
                transactionError: null
            }
        case UserActions.START_TRANSACTION: 
        return {
            ...state,
            transactionLoad: true,
            transactionError: null
        }
        case UserActions.TRANSACTION_SUCCESS: 
            const newTransaction = { ...action.payload }
            const updatingAccount = [...state.accounts]
            let newAccount = {...updatingAccount[0]}
            if(action.payload.status){
                newAccount.amount = newAccount.amount - action.payload.amount;
                updatingAccount[0] = newAccount
            }
            const updatedAccountArray = updatingAccount
            return {
                ...state,
                transactions: [...state.transactions, newTransaction],
                accounts: [...updatedAccountArray],
                transactionLoad: false
            }
        case UserActions.TRANSACTION_FAIL:
            return {
                ...state,
                transactionError: action.payload
            }
        case UserActions.ADD_ACCOUNT:
            const updatedAccount = [...state.accounts]
            updatedAccount.push(action.payload)
            return {
                ...state,
                accounts: [...updatedAccount]
            }
        case UserActions.ACCOUNT_UPDATED:
            let updateAccounts = [...state.accounts]
            updateAccounts[0] = {...action.payload}           
            return {
                ...state,
                accounts: [...updateAccounts]
            }
        case UserActions.ADD_NEW_CARD:
            const newCard = {...action.payload.card}
            return {
                ...state,
                cards: [...state.cards, newCard]
            }
        case UserActions.UPDATE_CARD: 
            const updatedCard = {...action.payload.updatedCard}
            const cards = [...state.cards];
            const index = cards.findIndex(el => el._id === updatedCard._id);
            cards[index] = updatedCard;
            return {
                ...state,
                cards: cards
            }
        default: return state
    }
}