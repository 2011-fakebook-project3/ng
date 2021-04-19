import { Routes, Route } from '@angular/router';
import { ShellComponent } from './shell.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * See https://fullstackmark.com/post/21/user-authentication-and-identity-with-angular-aspnet-core-and-identityserver
 * for more details on the use of this shell component in regards to the IdentityServer implementation.
 */
/**
 * Provides helper methods to create routes.
 */
export class Shell {

  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return {Route} The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      // =canActivate: [AuthenticationGuard],
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true }
    };
  }
}