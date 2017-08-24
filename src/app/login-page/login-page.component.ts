import { UserCredentialApi } from './../../shared/services/custom/UserCredential';
import { Routes } from '@angular/router';
import { DashboardPageComponent } from './../home-page/dashboard-page/dashboard-page.component';
import { Component, OnInit } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public username: any;
  public password: any;
  visibleS: any;
  visibleF: any;
  displaySuccess: any;
  displayFailed: any;

  constructor(
  private router: Router,
  public userCredentialApi: UserCredentialApi,
  public authService: AuthService,


  ) {
    this.displaySuccess = 'none';
    this.displayFailed = 'none';
    this.visibleS = false;
    this.visibleF = false;
  }

  ngOnInit() {
  }

  toggle() {

    console.log(this.visibleS);
    this.visibleS = !this.visibleS;
    this.visibleF = !this.visibleF;
    console.log(this.visibleS);
    this.displaySuccess = 'none';
    this.displayFailed = 'none';
  }

     doLogin() {
        console.log(
        this.username,
        this.password);
        const data = {
          email: this.username,
          password: this.password
        };
        this.userCredentialApi.login(data)
          .subscribe(() => {
              console.log('sukses');
              this.visibleS = !this.visibleS;
              this.displaySuccess = this.visibleS ? '' : 'none;';
              this.authService.login().subscribe(() => {
              if (this.authService.isLoggedIn) {
              this.router.navigate(['/home']);
            }
            });
          }, (error) => {
              this.visibleF = !this.visibleF;
              this.displayFailed = this.visibleF ? '' : 'none;';
              setTimeout(() => {
                    this.toggle();
              }, 3000);
              console.log('failed');
              console.log(error);
          });
   }

   doSignUp() {

      this.router.navigate(['/signup']);

   }
};
