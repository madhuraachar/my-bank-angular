import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class LoggerSerivce {
    
    logInfo(logText: string, infoObject: any)  {
        console.log(logText, infoObject)
    }

    logError(e:any) {
        console.log(e)
    }
}