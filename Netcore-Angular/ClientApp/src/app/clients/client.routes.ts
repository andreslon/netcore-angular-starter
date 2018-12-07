import { Routes } from '@angular/router';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from '../auth/auth.guard';
export const ROUTES: Routes = [
  {
    path: 'clients',
    component: ListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients/add/:id',
    component: AddEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients/add',
    component: AddEditComponent,
    canActivate: [AuthGuard]
  }
];
