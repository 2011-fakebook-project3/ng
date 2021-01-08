import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentViewComponent } from './component/comment-view/comment-view.component';
import { NavbarViewComponent } from './component/navbar-view/navbar-view.component';
import { MainViewComponent } from './component/main-view/main-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentViewComponent,
    NavbarViewComponent,
    MainViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
