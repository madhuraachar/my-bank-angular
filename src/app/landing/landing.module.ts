import {NgModule} from '@angular/core';
import { MessageComponent } from './account-details/account-section-a/message/message.component';

import { SavedAccountComponent } from './account-details/account-section-b/saved-account/saved-account.component';
import { TransactionTableComponent } from './account-details/account-section-b/recent-transaction/transaction-table/transaction-table.component';
import { RecentTransactionComponent } from './account-details/account-section-b/recent-transaction/recent-transaction.component';
import { PendingTransactionComponent } from './account-details/account-section-b/pending/pending.component';
import { AccountSectionBComponent } from './account-details/account-section-b/account-section-b.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountSectionAComponent } from './account-details/account-section-a/account-section-a.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LandingComponent } from './landing.component';
import { SharedModule } from '../shared/shared.module';
import { ChartModule } from '../chart/chart.module';

import { LandingRoutingModule } from './landing-routing.module';
import { BalanceComponent } from './balance/balance.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AllTransactionComponent } from './transaction/all-transaction/all-transaction.component';
import { TransactionFormComponent } from './transaction/transaction-form/transaction-form.component';
import { TransactionItemComponent } from './transaction/all-transaction/transaction-item/transaction-item.component';
import { SelectOptionComponent } from './transaction/select-option/select-option.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardListComponent } from './card-details/card-list/card-list.component';
import { SettingsComponent } from './settings/settings.component';
import { AlertComponent } from './alert/alert.component';
import { SingleAlertComponent } from './alert/alert-list/single-alert/single-alert.component';
import { AlertListComponent } from './alert/alert-list/alert-list.component';
import { ContactComponent } from './contact/contact.component';
import { ContactTypeComponent } from './contact/contact-type/contact-type.component';
import { TransactionSuccessComponent } from './transaction/transaction-success/transaction-success.component';

@NgModule({
    declarations: [
        LandingComponent,
        SidenavComponent,
        SearchBarComponent,
        AccountSectionAComponent,
        AccountDetailsComponent,
        AccountSectionBComponent,
        PendingTransactionComponent,
        RecentTransactionComponent,
        TransactionTableComponent,
        SavedAccountComponent,
        MessageComponent,
        BalanceComponent,
        TransactionComponent,
        AllTransactionComponent,
        TransactionFormComponent,
        TransactionItemComponent,
        SelectOptionComponent,
        CardDetailsComponent,
        CardListComponent,
        SettingsComponent,
        AlertComponent,
        AlertListComponent,
        SingleAlertComponent,
        ContactComponent,
        ContactTypeComponent,
        TransactionSuccessComponent
    ],
    imports: [
        SharedModule,
        ChartModule,
        LandingRoutingModule
    ],
    exports: [LandingComponent]
})
export class LandingModule{}