import { Routes } from '@angular/router';  
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component'; 
import { AuthGuard } from './auth/auth.guard'; 

export const ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'counter', component: CounterComponent, canActivate: [AuthGuard] },
  { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] }
];
