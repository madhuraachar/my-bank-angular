import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CreateAccountModule } from '../create-account/create-account.module';


const authRoutes: Routes = [
    {
        path: '', component: AuthComponent, children: [
            { path: '', component: LoginComponent },
            { path: 'signup', component: SignupComponent }
        ]
    },
]
@NgModule({
    declarations:[
        AuthComponent,
        SignupComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CreateAccountModule,
        RouterModule.forChild(authRoutes)
    ]
})
export class AuthModule {}