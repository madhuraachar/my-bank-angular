import { Component, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent {
    @ViewChild('accountForm') accountForm: NgForm;
    constructor(){}
    
}