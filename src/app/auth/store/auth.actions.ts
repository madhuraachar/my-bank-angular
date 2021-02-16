import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN_START = '[Auth] Login Start';
export const SIGNUP_START = '[Auth] Signup Start';
export const AUTH_SUCCESS = '[Auth] Auth Success';
export const AUTH_ERROR = '[Auth] Auth Error';
export const CLEAR_ERROR = '[Auth] Auth Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: {email: string, password: string}){}
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: {email: string, password: string, name: string}){}
}

export class AuthSuccess implements Action {
    readonly type = AUTH_SUCCESS;
    constructor(public payload: {user: User, token: string}){}
}

export class AuthError implements Action {
    readonly type = AUTH_ERROR;
    constructor(public payload: string){}
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class ClearAuthError implements Action {
    readonly type = CLEAR_ERROR;
}

export type AuthAction = LoginStart | SignupStart | AuthSuccess | AuthError | AutoLogin | Logout | ClearAuthError
