import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoggerSerivce } from '../log.service';
@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    constructor(private router: Router, private logService: LoggerSerivce){}

    onNavigateOption(navObj: { icon: string, title: string, id: number }) {
        try {
            this.router.navigate([`/${navObj.icon === 'home' ? 'home' : navObj.icon + '/' + navObj.id}`])
        } catch (e) {
            this.logService.logError(e)
        }
    }
}