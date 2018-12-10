import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from './../client.service';
import { ClientFullModel } from './../client.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';



@Component({
  selector: 'sec-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  id: string;
  isLoading: boolean;
  name = new FormControl('', [Validators.required]);
  redirectUri = new FormControl('');
  postLogoutRedirectUri = new FormControl('');

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  constructor(
    private clientservice: ClientService,
    private route: ActivatedRoute) {
  }
  back() {
    window.history.back();
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.isLoading = true;
      this.clientservice.get(this.id).subscribe((data: any) => {
        if (data && data.isSuccess) {
          this.name.setValue(data.result.name);
          this.postLogoutRedirectUri.setValue(data.result.postLogoutRedirectUri);
          this.redirectUri.setValue(data.result.redirectUri);
        }
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
      });
    }, (error: any) => {
      this.isLoading = false;
    });
  }
  clear() {
    this.name.reset();
    this.postLogoutRedirectUri.reset();
    this.redirectUri.reset();
  }
  save(form: FormGroup) {
    this.isLoading = true;
    let body = {
      name: this.name.value,
      redirectUri: this.redirectUri.value,
      postLogoutRedirectUri: this.postLogoutRedirectUri.value,
      id: this.id
    };
    this.clientservice.addUpdate(body).subscribe(data => {
      this.isLoading = false;
      this.back();
    }, (error: any) => {
      this.isLoading = false;
    });

    form.reset();
  }
}
