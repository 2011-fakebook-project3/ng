import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NewsfeedComponent } from './component/newsfeed/newsfeed.component';
import { MainViewComponent } from './component/main-view/main-view.component';


const routes: Routes = [
    {  path: '', component: MainViewComponent },
    { path: 'Newsfeed', component: NewsfeedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),  HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
