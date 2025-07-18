import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'sucursales', component: SucursalesComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];