import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationsViewComponent } from './notifications-view/notifications-view.component';
import { NavbarViewComponent } from './navbar-view/navbar-view.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { TimeAgoPipe } from 'time-ago-pipe';


import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';

import { MainViewComponent } from './component/main-view/main-view.component';
import { NewsfeedComponent } from './component/newsfeed/newsfeed.component';

@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoExtendsPipe extends TimeAgoPipe implements PipeTransform{}

const config = {
  issuer: 'https://dev-2875280.okta.com/oauth2/default',
  pkce: true,
  clientId: '0oa3g3amkeK6iIIeP5d6',
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: ['openid'],
  postLogoutRedirectUri: window.location.origin
};

@NgModule({
  declarations: [
    AppComponent,
    NotificationsViewComponent,
    NavbarViewComponent,
    TimeAgoExtendsPipe,
    MainViewComponent,
    NewsfeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OktaAuthModule
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: config }],
  bootstrap: [AppComponent]
})
export class AppModule { }
