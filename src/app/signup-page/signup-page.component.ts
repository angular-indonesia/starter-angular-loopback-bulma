import { Router } from '@angular/router';
import { User } from './../../shared/models/User';
import { UserApi } from './../../shared/services/custom/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

    public item: User = new User();
    public username: any;
    public password: any;
    public emailVerified: any;
    public email: any;
    public realm: any;

  constructor(

    public userApi : UserApi,
    private router: Router,

  ) { }

  ngOnInit() {

  }

  signUp() {

        this.item.realm = this.realm;
        this.item.username = this.username;
        this.item.email = this.email;
        this.item.password = this.password;
//      this.item.emailVerified = "1";

        this.userApi.create(this.item).subscribe(() => 
            this.router.navigate(['/home'])
        );
        console.log("signup sukses");
  }
    
}
