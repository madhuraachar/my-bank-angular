import { Component, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-create-card',
    templateUrl: './create-card.component.html',
    styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent {
    @ViewChild('cardForm') cardForm: NgForm;
    @Input() cardCreateType;
    cardTypes = [ "CREDIT",  "DEBIT"]
    cardNames = [ 'VISA', 'MASTER', 'PLATINUM']
}