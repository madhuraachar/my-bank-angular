import { NgModule } from '@angular/core'; 
import { CreateAccountComponent } from './create-account.component';
import { AccountComponent } from './account/account.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';

@NgModule({
    declarations: [
        CreateAccountComponent, 
        AccountComponent, 
        CreateCardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    exports:[],
    entryComponents: [CreateAccountComponent]
})
export class CreateAccountModule{}