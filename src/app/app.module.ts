import { FileUploadMasterPageComponent } from './file-upload-master-page/file-upload-master-page.component';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';

import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { SDKBrowserModule } from './../shared/index';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChatService } from './chat.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardPageComponent } from './home-page/dashboard-page/dashboard-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ChartPageComponent } from './home-page/chart-page/chart-page.component';
import { FileUploadPageComponent } from './file-upload-master-page/file-upload-page/file-upload-page.component';
import { ChatPageComponent } from './home-page/chat-page/chat-page.component';
import { ChatRoomPageComponent } from './home-page/chat-room-page/chat-room-page.component';
import { FileUploadAdvancedPageComponent } from './file-upload-master-page/file-upload-advance-page/file-upload-advance-page.component';
import { CrudPageComponent } from './home-page/crud-page/crud-page.component';
import { MapsPageComponent } from './maps-page/maps-page.component';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Ng2chartPageComponent } from './home-page/chart-page/ng2chart-page/ng2chart-page.component';
import { GoogleChartPageComponent } from './home-page/chart-page/google-chart-page/google-chart-page.component';
import { HighchartsPageComponent } from './home-page/chart-page/highcharts-page/highcharts-page.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NotFoundPageComponent } from './home-page/not-found-page/not-found-page.component';

export function highchartsFactory() {
  return highcharts;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    DashboardPageComponent,
    SignupPageComponent,
    ChartPageComponent,
    FileUploadPageComponent,
    ChatPageComponent,
    ChatRoomPageComponent,
    CrudPageComponent,
    FileUploadPageComponent,
    MapsPageComponent,
    FileUploadAdvancedPageComponent,
    MapsPageComponent,
    Ng2chartPageComponent,
    GoogleChartPageComponent,
    HighchartsPageComponent,
    FileUploadMasterPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SDKBrowserModule.forRoot(),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBOMQvUP42I2WI_70m32U_L1n10dblGezM'
    }),
    ChartsModule,
    Ng2GoogleChartsModule,
    ChartModule
  ],
  providers: [AuthGuard, AuthService, ChatService, {
    provide: HighchartsStatic,
    useFactory: highchartsFactory
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
