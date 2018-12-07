import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from './../shared/shared.module';
import { ROUTES } from './client.routes';
import { ClientService } from './client.service';

import { MaterialModule } from './../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ListComponent, AddEditComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    RouterModule.forChild(ROUTES),
    MaterialModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ListComponent, AddEditComponent],
  providers: [ClientService]
})
export class ClientModule {
}
