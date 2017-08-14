import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardPageComponent } from './home-page/dashboard-page/dashboard-page.component';
import { FileUploadPageComponent } from './file-upload-page/file-upload-page.component';

const routes: Routes = [
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: 'home', component: HomePageComponent, children: [
      { path: 'dashboard', component: DashboardPageComponent },
    ]
  },
  { path: '', component: LoginPageComponent },
  { path: '**', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
