import { Routes } from '@angular/router';
import { DashboardPageComponent } from './../home-page/dashboard-page/dashboard-page.component';
import { UserApi } from './../../shared/services/custom/User';
import { Component, OnInit } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router }    from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public username: any;
  public password: any;
  constructor(
  private router: Router,
  public userApi : UserApi,

  ) { }

  ngOnInit() {
  }

  doLogin() {
    console.log(this.username,this.password);
    const data = {
      username: this.username,
      password: this.password
    };
    this.userApi.login(data)
      .subscribe(() => {
        console.log("sukses");
        this.router.navigate(['/home'])
      }, (error) => {
        console.log(error);
      });
  }

}
