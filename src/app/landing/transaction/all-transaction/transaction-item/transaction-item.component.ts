import { OnInit, Component, Input } from '@angular/core';
import { Transaction } from '../../transaction.model';

@Component({
    selector: 'app-transaction-item',
    templateUrl: './transaction-item.component.html',
    styleUrls: ['./transaction-item.component.scss']
})
export class TransactionItemComponent implements OnInit {
    @Input() transaction: Transaction;
    constructor(){}
    ngOnInit(){
    }
}