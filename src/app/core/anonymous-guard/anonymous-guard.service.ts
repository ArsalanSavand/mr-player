import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { UserService } from '@app/core/user/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnonymousGuardService implements CanLoad {

  constructor(private router: Router) {
  }

  /**
   * A guard deciding if children can be loaded.
   *
   * @param route A configuration object that defines a single route.
   *              A set of routes are collected in a `Routes` array to define a `Router` configuration.
   *              The router attempts to match segments of a given URL against each route,
   *              using the configuration options defined in this object.
   *
   *              Supports static, parameterized, redirect, and wildcard routes, as well as
   *              custom route data and resolve methods.
   * @param segments Represents list of URL segments.
   *
   *                 A UrlSegment is a part of a URL between the two slashes. It contains a path and the matrix
   *                 parameters associated with the segment.
   */
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    // If user is not logged-in, then allow user to access current route.
    if (!UserService.user) {
      return true;
    }

    // Not logged-in prevent user from accessing current route and redirect user to main page with the return url.
    this.router.navigateByUrl('/main');
    return false;
  }
}
