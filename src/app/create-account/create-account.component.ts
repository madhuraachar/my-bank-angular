import { Component, ViewEncapsulation, OnInit, OnDestroy, ViewChild, Inject } from "@angular/core";
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import { Subscription } from 'rxjs';
import { AccountComponent } from './account/account.component';
import { CreateCardComponent } from './create-card/create-card.component';
import * as CreateAccountAction from './store/create-account.action';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateAccountComponent implements OnInit, OnDestroy{
    @ViewChild('appAccount') appAccount: AccountComponent; 
    @ViewChild('appCreate') appCreate: CreateCardComponent; 

    accountType: 'UPDATE_ACCOUNT' | 'CREATE_ACCOUNT' | 'CREATE_CARD' | 'UPDATE_CARD' = 'UPDATE_ACCOUNT';
    
    storeSub: Subscription;
    constructor(private store: Store<fromApp.AppState>, private dialogRef: MatDialogRef<CreateAccountComponent>, @Inject(MAT_DIALOG_DATA) public data: {type: any, _id?: string}){}
    ngOnInit(){
        this.accountType = this.data.type;
        this.storeSub = this.store.select('createAccount').subscribe(createAccountState => {
            if (createAccountState.popup) {
                console.log("UPDATE SUCCESS")
                this.closeTheDialog()
            }
        })
    }

    isFormValid() {
        if (this.appAccount) {
            return this.appAccount.accountForm.form.invalid
        } else if (this.appCreate) {
            return  this.appCreate.cardForm.form.invalid
        }
    }

    onCreate() {
        if(! this.isFormValid()) {
            switch (this.accountType) {
                case 'CREATE_ACCOUNT' : 
                    const createAccountForm = this.appAccount.accountForm.form
                    this.store.dispatch(new CreateAccountAction.StartCreateAccount({ amount: createAccountForm.value.amount, _id: null, date: new Date(), owner: null }))
                    break;
                case 'UPDATE_ACCOUNT':
                    const updateAccountForm = this.appAccount.accountForm.form
                    this.store.dispatch(new CreateAccountAction.BalanceUpdateStart(updateAccountForm.value.amount))
                    break;
                case 'CREATE_CARD':
                    const createCardForm = this.appCreate.cardForm.form
                    this.store.dispatch(new CreateAccountAction.CreateCardStart(createCardForm.value))
                    break;
                case 'UPDATE_CARD':
                    const updateCardForm = this.appCreate.cardForm.form
                    const updatingAmount = updateCardForm.value.inCardAmount;
                    const _id = this.data._id
                    this.store.dispatch(new CreateAccountAction.UpadteCardAmountStart({ updatingAmount, _id}))
                    break;
                default: return
            }
            
        }
    }
    
    getPageName() {
        return this.accountType.split('_').join(' ')
    }

    closeTheDialog() {
        //setTimeout(() => {
            this.dialogRef.close();
        //}, 0);
    }

    ngOnDestroy() {
        if(this.storeSub) {
            this.storeSub.unsubscribe();
        }
        this.store.dispatch(new CreateAccountAction.ResetAll())
    }
}