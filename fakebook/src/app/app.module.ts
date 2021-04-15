import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from 'time-ago-pipe';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostViewComponent } from './component/post-view/post-view.component';
import { CommentFormComponent } from './component/comment-form/comment-form.component';
import { LikeViewComponent } from './component/like-view/like-view.component';
import { NewsfeedComponent } from './component/newsfeed/newsfeed.component';
import { NotificationsViewComponent } from './component/notifications-view/notifications-view.component';
import { CommentViewComponent } from './component/comment-view/comment-view.component';
import { NavbarViewComponent } from './component/navbar-view/navbar-view.component';
import { MainViewComponent } from './component/main-view/main-view.component';
import { ProfileViewComponent } from './component/profile-view/profile-view.component';
import { PostFormComponent } from './component/post-form/post-form.component';

import { CoreModule } from './authentication/core/core.module';
import { AccountModule }  from './authentication/account/account.module';
import { ShellModule } from './authentication/shell/shell.module';
import { SharedModule }   from './authentication/shared/shared.module';
import { AuthGuard } from './authentication/core/authentication/auth.guard';

@Pipe({
  name: 'timeAgo',
  pure: false,
})
export class TimeAgoExtendsPipe extends TimeAgoPipe implements PipeTransform {}

const config = {
  issuer: 'https://revature-p3.okta.com/oauth2/default',
  pkce: true,
  clientId: '0oafgszgmBjYO7PPh5d6',
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: ['openid'],
  postLogoutRedirectUri: window.location.origin,
};

@NgModule({
  declarations: [
    AppComponent,
    PostViewComponent,
    NotificationsViewComponent,
    CommentViewComponent,
    NewsfeedComponent,
    NavbarViewComponent,
    TimeAgoExtendsPipe,
    MainViewComponent,
    NewsfeedComponent,
    ProfileViewComponent,
    PostViewComponent,
    CommentFormComponent,
    LikeViewComponent,
    PostFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OktaAuthModule,
    CommonModule,
    FormsModule,
    CoreModule,
    AccountModule,
    AppRoutingModule,
    ShellModule,   
    SharedModule 
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: config }, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
