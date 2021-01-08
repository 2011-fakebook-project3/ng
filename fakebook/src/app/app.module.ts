import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationsViewComponent } from './notifications-view/notifications-view.component';
import { NavbarViewComponent } from './navbar-view/navbar-view.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { TimeAgoPipe } from 'time-ago-pipe';

@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoExtendsPipe extends TimeAgoPipe implements PipeTransform{}

@NgModule({
  declarations: [
    AppComponent,
    NotificationsViewComponent,
    NavbarViewComponent,
    TimeAgoExtendsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
