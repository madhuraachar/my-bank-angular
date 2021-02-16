import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient){}
    private user: any;

    getUserDetails() {
        this.http.get('http://localhost:3000/users').subscribe(resp => {
            console.log(resp)
        })
    }
}