import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'app-transaction-table',
    templateUrl: './transaction-table.component.html',
    styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit{
    @Input() tableContent = [];
    displayedColumns: string[] = ['image', 'name', 'account', 'status'];

    constructor(){}

    ngOnInit() {
       
    }
}