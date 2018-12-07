import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  hide = true;
  isLoading: boolean;
  password = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) { }
  ngOnInit() {
    // reset login status
    this.auth.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  getErrorPassword() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }
  getErrorUsername() {
    return this.username.hasError('required') ? 'You must enter a value' : '';
  }
  save(form: FormGroup) {
    this.isLoading = true;
    if (form.valid) {
      this.auth.sendToken(form.value.username);
      // login successful so redirect to return url
      this.router.navigateByUrl(this.returnUrl);
      this.isLoading = false;
    }
  }
}
