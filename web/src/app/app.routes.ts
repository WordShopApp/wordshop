import { Routes } from '@angular/router';

import { RootComponent } from './components/root/root.component';
import { RootResolver } from './components/root/root.resolver';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { JoinComponent } from './components/join/join.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { AuthService } from './services/auth/auth.service';

export const AppRoutes: Routes  = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'join', component: JoinComponent
  },
  {
    path: 'welcome', component: WelcomeComponent
  },
  {
    path: '',
    component: RootComponent,
    resolve: { data: RootResolver },
    canActivate: [AuthService],
    children: [
      { path: '', component: DashboardComponent }
    ]
  }

];
