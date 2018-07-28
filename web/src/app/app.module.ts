import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';

// Services
import { AccountService } from './services/account/account.service';
import { ApiService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';
import { CognitoService } from './services/cognito/cognito.service';
import { GravatarService } from './services/gravatar/gravatar.service';
import { LoggerService } from './services/logger/logger.service';
import { MessengerService } from './services/messenger/messenger.service';
import { NavService } from './services/nav/nav.service';
import { RosieService } from './services/rosie/rosie.service';
import { SettingsService } from './services/settings/settings.service';
import { StoreService } from './services/store/store.service';
import { StoreReducer } from './services/store/store.reducer';
import { WordIconService } from './services/word-icon/word-icon.service';

// Components
import { AboutComponent } from './components/about/about.component';
import { AlertComponent } from './components/alert/alert.component';
import { RootComponent } from './components/root/root.component';
import { RootResolver } from './components/root/root.resolver';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { JoinComponent } from './components/join/join.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { NavComponent } from './components/nav/nav.component';
import { WordIconComponent } from './components/word-icon/word-icon.component';
import { IconTesterComponent } from './components/icon-tester/icon-tester.component';
import { ProfileBannerComponent } from './components/profile-banner/profile-banner.component';
import { ProjectListComponent } from './components/project-list/project-list.component';


import { CookieService } from 'ng2-cookies';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JoinComponent,
    RootComponent,
    DashboardComponent,
    WelcomeComponent,
    AlertComponent,
    ForgotPasswordComponent,
    TermsComponent,
    PrivacyComponent,
    CookiesComponent,
    ConfirmationComponent,
    AboutComponent,
    NavComponent,
    WordIconComponent,
    IconTesterComponent,
    ProfileBannerComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes, { useHash: false })
  ],
  exports: [RouterModule],
  providers: [
    AccountService,
    ApiService,
    AuthService,
    CognitoService,
    CookieService,
    GravatarService,
    LoggerService,
    MessengerService,
    NavService,
    RootResolver,
    RosieService,
    SettingsService,
    StoreReducer,
    StoreService,
    WordIconService,
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
