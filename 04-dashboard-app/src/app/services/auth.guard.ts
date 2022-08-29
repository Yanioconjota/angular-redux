import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        //tap adds a secondary effect --> if there is no state (user logged in, navigate to login)
        tap( state => { if (!state) this.router.navigate(['/login']) }),
        //Subscription cancelled after first resolve
        take(1)
      );
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        //tap adds a secondary effect --> if there is no state (user logged in, navigate to login)
        tap( state => { if (!state) this.router.navigate(['/login']) })
      );
  }

}
