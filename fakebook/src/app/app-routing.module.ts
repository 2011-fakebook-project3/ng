import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsfeedComponent } from './components/newsfeed/newsfeed.component';

const routes: Routes = [
  { path: 'Newsfeed', component: NewsfeedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
