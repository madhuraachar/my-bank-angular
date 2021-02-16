import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { LandingComponent } from './landing.component';
import { BalanceComponent } from './balance/balance.component';
import { NAVIGATION_LIST } from '../shared/navigation';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionFormComponent } from './transaction/transaction-form/transaction-form.component';
import { SelectOptionComponent } from './transaction/select-option/select-option.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { SettingsComponent } from './settings/settings.component';
import { AlertComponent } from './alert/alert.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from '../auth/auth.guard';
import { TransactionSuccessComponent } from './transaction/transaction-success/transaction-success.component';

const routes: Routes = [
    {
        path: '', component: LandingComponent, canActivate: [AuthGuard], children:[
        {path: '', redirectTo: '/home', pathMatch: 'full'},
        { path: 'home', component: AccountDetailsComponent },
        { path: `${NAVIGATION_LIST[1].icon}/:id`, component: BalanceComponent},
        { path: `${NAVIGATION_LIST[2].icon}/: id `, component: CardDetailsComponent},
        { path: `${NAVIGATION_LIST[3].icon}/:id`, component: TransactionComponent, children: [
            { path: '', component: SelectOptionComponent},
            { path: 'new', component: TransactionFormComponent},
            { path: ':id/new', component: TransactionFormComponent},
            { path: ':id/edit', component: TransactionFormComponent},
            { path: ':id/success', component: TransactionSuccessComponent}
        ]},
        { path: `${NAVIGATION_LIST[4].icon}/:id`, component: SettingsComponent},
        { path: `${NAVIGATION_LIST[5].icon}/:id`, component: AlertComponent},
        { path: `${NAVIGATION_LIST[6].icon}/:id`, component: ContactComponent}
    ]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingRoutingModule{}