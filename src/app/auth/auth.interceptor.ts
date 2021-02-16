import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as fromApp from './../store/app.reducer';
import { Store } from '@ngrx/store';
import { take, map, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.token;
            }),
            exhaustMap(token => {
                if(! token) {
                    return next.handle(req)
                }
                const authReq = req.clone({
                    headers: new HttpHeaders().set('Authorization', token)
                })
                return next.handle(authReq)
            })
        )

    }
}