import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  showMiniMenu: boolean = false;
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {

  }

  toggleMenu() {
    this.showMiniMenu = !this.showMiniMenu;
  }

  logOut() {
        this.authService.login().subscribe(() => {
            if (this.authService.isLoggedIn) {
            this.router.navigate(['/home']);
        }
        });
  }

}
