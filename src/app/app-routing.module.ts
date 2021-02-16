import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: "",  loadChildren: () => import('./landing/landing.module').then(el => el.LandingModule)},
    { path: 'auth',  loadChildren: () => import('./auth/auth.module').then(el => el.AuthModule)},
    {path: '**', redirectTo: "auth"}
]
@NgModule({
    imports: [RouterModule.forRoot(routes, {
        
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {}