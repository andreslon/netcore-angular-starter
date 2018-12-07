import { Component, OnInit } from '@angular/core';
import { ClientService } from './../client.service';
import { ClientBaseModel, ClientFullModel } from './../client.model';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './../../shared/dialog/dialog.component';
import { ServiceBuilder } from 'selenium-webdriver/chrome';

@Component({
  selector: 'sec-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  resultsLength = 0;
  isLoading = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filteredOptions: Observable<string>;
  filter: string;
  displayedColumns: string[] = ['id', 'name', 'redirectUri', 'postLogoutRedirectUri', 'edit', 'delete'];
  data: ClientBaseModel[] = [];

  constructor(
    public dialog: MatDialog,
    private clientservice: ClientService,
    private router: Router) {
  }
  ngOnInit() {

    this.reload();
  }
  reload() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.clientservice!.getAll(this.sort.active, this.filter, this.paginator.pageIndex);
        }),
        map((data: any) => {
          this.isLoading = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.pager.itemCount;

          return data.result;
        }),
        catchError(() => {
          this.isLoading = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
  edit(item: ClientBaseModel) {
    this.router.navigate(['/clients/add', { id: item.id }]);
  }
  delete(item: ClientBaseModel): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: item.name, message: 'Are you sure you want to delete this item?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.clientservice.delete(item.id).subscribe((data: any) => {
          this.isLoading = false;
          this.reload();
          
        });
      }
    });
  }
} 
