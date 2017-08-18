import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { SDKBrowserModule } from './../shared/index';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardPageComponent } from './home-page/dashboard-page/dashboard-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ChartPageComponent } from './home-page/chart-page/chart-page.component';
import { FileUploadPageComponent } from './file-upload-page/file-upload-page.component';
import { ChatPageComponent } from './home-page/chat-page/chat-page.component';
import { ChatRoomPageComponent } from './home-page/chat-room-page/chat-room-page.component';
import { MapsPageComponent } from './maps-page/maps-page.component';
import { AgmCoreModule } from '@agm/core';


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
    MapsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SDKBrowserModule.forRoot(),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBOMQvUP42I2WI_70m32U_L1n10dblGezM'
    })
  ],
  providers: [AuthGuard, AuthService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
