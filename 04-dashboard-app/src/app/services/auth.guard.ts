import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        //tap adds a secondary effect --> if there is no state (user logged in, navigate to login)
        tap( state => { if (!state) this.router.navigate(['/login']) })
      );
  }

}
