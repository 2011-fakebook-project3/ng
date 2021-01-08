import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationsViewComponent } from './notifications-view/notifications-view.component';
import { NavbarViewComponent } from './navbar-view/navbar-view.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'


@NgModule({
  declarations: [
    AppComponent,
    NotificationsViewComponent,
    NavbarViewComponent
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
