import { ChartPageComponent } from './home-page/chart-page/chart-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { AuthGuard } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardPageComponent } from './home-page/dashboard-page/dashboard-page.component';
import { FileUploadPageComponent } from './file-upload-page/file-upload-page.component';
import { ChatPageComponent } from './home-page/chat-page/chat-page.component';
import { ChatRoomPageComponent } from './home-page/chat-room-page/chat-room-page.component';

const routes: Routes = [
  {
    path: 'login', component: LoginPageComponent
  },
  { path: 'signup', component: SignupPageComponent },
  {
    path: 'home', component: HomePageComponent, children: [
      { path: '', component: DashboardPageComponent },
      { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
      { path: 'chart', component: ChartPageComponent },
      { path: 'dashboard', component: DashboardPageComponent }, {
        path: 'chat', component: ChatPageComponent, children: [
          { path: 'chatroom/:id', component: ChatRoomPageComponent }
        ]
      },
    ]
  },
  {
    path: 'fileupload', component: FileUploadPageComponent
  },
  { path: '', component: LoginPageComponent },
  { path: '**', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
