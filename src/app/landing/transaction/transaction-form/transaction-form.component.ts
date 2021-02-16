import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from './../../../store/app.reducer';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Transaction } from '../transaction.model';
import * as UserActions from './../../store/user.actions';

@Component({
    selector: 'app-transaction-form',
    templateUrl: './transaction-form.component.html',
    styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit, OnDestroy {
    transactionForm: FormGroup;
    sendMode = true;
    id: string;
    storeSub: Subscription;
    storeSubUser: Subscription;
    loader = false;
    constructor(private route: ActivatedRoute, private store: Store<fromApp.AppState>){}
    ngOnInit(){
        this.route.params.subscribe((param: Params) => {
            this.sendMode = param['id'] ? false : true;
            this.id = param['id']
            this.initForm()
        })
        this.storeSubUser = this.store.select('user').subscribe(userState => {
            if(userState) {
                this.loader = false;
            }
        })
    }

    private initForm() {
        let name = "";
        let accountNo = "";
        let amount = null;
        let bankName = "";
        let transactionType = "";
        let date = new Date();
        if(! this.sendMode) {
            //old transaction
            this.storeSub = this.store.select('user').pipe(map(userState => userState.transactions.find(el => el._id === this.id)))
            .subscribe(trn => {
                const transaction = trn
                name = transaction.name;
                accountNo = transaction.accountNo;
                amount = transaction.amount;
                bankName = transaction.bankName;
                transactionType = transaction.transactionType;
                date = transaction.date;
            })
        }
        this.transactionForm = new FormGroup({
            name: new FormControl(name, [Validators.required]),
            accountNo: new FormControl(accountNo, [Validators.required, Validators.minLength(24), Validators.maxLength(24)]),
            amount: new FormControl(amount, [Validators.required, Validators.min(1)]),
            bankName: new FormControl(bankName, [Validators.required]),
            transactionType: new FormControl(transactionType, [Validators.required]),
            date: new FormControl(date)
        })
    }

    onSubmit() {
        if(this.transactionForm.invalid) {
            return false;
        }
        this.loader = true;
        const transaction: Transaction = { ...this.transactionForm.value, _id: null, type: 'TRANSFER'}
        this.store.dispatch(new UserActions.TransactionStart({transaction: transaction}))
    }

    ngOnDestroy() {
        if(this.storeSub) {
            this.storeSub.unsubscribe();
        }
        if(this.storeSubUser) {
            this.storeSubUser.unsubscribe();
        }
    }
}