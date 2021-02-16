import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as fromApp from './../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private store: Store<fromApp.AppState>) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => authState.token),
            map(token => {
                if (token) {
                    return true;
                }
                return this.router.createUrlTree(['/auth'])
            })
        )
    }
}