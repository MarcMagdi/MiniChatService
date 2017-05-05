/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login'
import { DashboardComponent, MainComponent } from './components/dashboard';
import { AuthService } from './services';
import {ConversationComponent} from "./components/dashboard/messages/conversation";
import {ConversationsComponent} from "./components/dashboard/messages/conversations";

export const ROUTES: Routes = [
  { path: '',
    component: MainComponent,
    canActivate: [AuthService],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'conversations/:id', component: ConversationComponent },
      { path: 'conversations/new', component: ConversationComponent },
      { path: 'conversations', component: ConversationsComponent },
      { path: '', component: DashboardComponent }
    ]
  },
  { path: 'login', component: LoginComponent }//,
  // { path: '**', redirectTo: 'dashboard' }
];
