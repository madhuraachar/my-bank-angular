import  { User } from './../user.model';
import * as AuthAction from './auth.actions';

export interface State {
    user: User,
    token: string,
    error: string
}

const initAuth: State = {
    user: null,
    token: null,
    error: null
}

export function authReducer(state: State = initAuth, action: AuthAction.AuthAction) {
    switch (action.type) {
        case AuthAction.AUTO_LOGIN:
        case AuthAction.SIGNUP_START:
        case AuthAction.LOGIN_START: {
            return {
                ...state,
                error: null
            }
        }
        case AuthAction.AUTH_SUCCESS: {
            return {
                ...state,
                user: {...action.payload.user},
                token: action.payload.token,
                error: null
            }
        }
        case AuthAction.AUTH_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case AuthAction.CLEAR_ERROR: {
            return {
                ...state,
                error: null
            }
        }
        case AuthAction.LOGOUT: {
            return {
                ...state,
                user: null,
                token: null,
                error: null
            }
        }
        default : return state
    }
}