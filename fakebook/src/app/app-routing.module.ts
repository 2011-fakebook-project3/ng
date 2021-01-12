import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { MainViewComponent } from './component/main-view/main-view.component';
import { NewsfeedComponent } from './component/newsfeed/newsfeed.component';
import { ProfileViewComponent } from './component/profile-view/profile-view.component';

const routes: Routes = [
  {  path: '', component: MainViewComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'logout', component: OktaCallbackComponent },
  { path: 'newsfeed', component: NewsfeedComponent },
  { path: 'user/:id', component: ProfileViewComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
