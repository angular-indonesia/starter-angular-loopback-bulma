import { OrganizationPageComponent } from './home-page/organization-page/organization-page.component';
import { NotFoundPageComponent } from './home-page/not-found-page/not-found-page.component';
import { CrudPageComponent } from './home-page/crud-page/crud-page.component';
import { MapsPageComponent } from './maps-page/maps-page.component';
import { HighchartsPageComponent } from './home-page/chart-page/highcharts-page/highcharts-page.component';
import { GoogleChartPageComponent } from './home-page/chart-page/google-chart-page/google-chart-page.component';
import { Ng2chartPageComponent } from './home-page/chart-page/ng2chart-page/ng2chart-page.component';
import { ChartPageComponent } from './home-page/chart-page/chart-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { AuthGuard } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardPageComponent } from './home-page/dashboard-page/dashboard-page.component';
import { FileUploadPageComponent } from './file-upload-master-page/file-upload-page/file-upload-page.component';
import { ChatPageComponent } from './home-page/chat-page/chat-page.component';
import { ChatRoomPageComponent } from './home-page/chat-room-page/chat-room-page.component';
import { FileUploadAdvancedPageComponent } from './file-upload-master-page/file-upload-advance-page/file-upload-advance-page.component';
import { FileUploadMasterPageComponent } from './file-upload-master-page/file-upload-master-page.component';
const routes: Routes = [
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: 'signup', component: SignupPageComponent
  },
  {
    path: 'home', component: HomePageComponent, canActivate: [AuthGuard], children: [
      { path: '', component: DashboardPageComponent },
      { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
      { path: 'chart', component: ChartPageComponent },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'maps', component: MapsPageComponent},
      { path: 'chart', component: ChartPageComponent, children: [
          { path: '', redirectTo: 'ng2chart', pathMatch: 'full' },
          { path: 'ng2chart', component: Ng2chartPageComponent },
          { path: 'google-chart', component: GoogleChartPageComponent },
          { path: 'highcharts', component: HighchartsPageComponent },
          { path: '**', redirectTo: 'ng2chart' }
        ]
      },
      {
        path: 'chat', component: ChatPageComponent, children: [
          { path: 'chatroom/:id', component: ChatRoomPageComponent }
        ]
      },
         {path: 'fileuploadadvence', component: FileUploadAdvancedPageComponent
      },
           {path: 'fileuploadmaster', component: FileUploadMasterPageComponent
      },
      {
        path: 'fileupload', component: FileUploadPageComponent
      },
      { path: 'crud', component: CrudPageComponent },
      { path: 'organization', component: OrganizationPageComponent},
    ]
  },


  { path: '', component: LoginPageComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
