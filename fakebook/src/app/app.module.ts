import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsfeedComponent } from './component/newsfeed/newsfeed.component';
import { NavbarViewComponent } from './component/navbar-view/navbar-view.component';
import { MainViewComponent } from './component/main-view/main-view.component';



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
    NewsfeedComponent,
    NavbarViewComponent,
    MainViewComponent,
    NewsfeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: config }],
  bootstrap: [AppComponent]
})
export class AppModule { }
