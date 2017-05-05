import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { LoginComponent } from './components/login';
import { DashboardComponent, MainComponent } from './components/dashboard'
import { AuthService, ApiService, NotificationService, SubscribeService } from './services';
import { SidebarComponent, FooterComponent, NavbarComponent } from './ui';
import { UsersService } from './models';
import {ConversationComponent} from "./components/dashboard/messages/conversation";
import {ConversationsComponent} from "./components/dashboard/messages/conversations";
import {ThreadsService} from "./models/thread";
import {MessagesService} from "./models/message";

@NgModule({
  declarations: [
    AppComponent, LoginComponent,
    MainComponent, DashboardComponent,
    ConversationComponent, ConversationsComponent,
    SidebarComponent, FooterComponent, NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [
    AuthService,
    ApiService,
    NotificationService,
    SubscribeService,
    UsersService,
    ThreadsService,
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
