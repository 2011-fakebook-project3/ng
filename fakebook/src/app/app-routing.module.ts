import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NewsfeedComponent } from './component/newsfeed/newsfeed.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { MainViewComponent } from './component/main-view/main-view.component';
import { ProfileViewComponent } from './component/profile-view/profile-view.component';
import { SearchResultsComponent } from './component/search-results/search-results.component';

const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'newsfeed', component: NewsfeedComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'logout', component: OktaCallbackComponent },
  { path: 'profile/:email', component: ProfileViewComponent },
  { path: 'profile', component: ProfileViewComponent },
  { path: 'search/:name', component: SearchResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
