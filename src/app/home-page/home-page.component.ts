import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  showMiniMenu: Boolean = false;

  displayChart: String = 'none';
  displayUpload: String = 'none';
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

  display() {
    this.displayChart === 'none' ? this.displayChart = 'block' : this.displayChart = 'none';

  }
  displayFileUpload() {
    this.displayUpload === 'none' ? this.displayUpload = 'block' : this.displayUpload = 'none';
  }

  signOut() {
    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        this.router.navigate(['/login']);
      }
    });
  }

}
