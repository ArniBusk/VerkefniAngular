import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardGuard implements CanActivate {
  constructor(private data: DataService, private router: Router, private auth:AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const requiresLogin = next.data.requiresLogin || false
      const requiresAdmin = next.data.requiresAdmin || false
      if(requiresLogin){
    return this.checkLogin();
    }
    if(requiresAdmin) {
      return this.checkAdmin();
    }
  }

  checkLogin():boolean {

    if(this.data.loggedin.value) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
    
  }

  checkAdmin():boolean {
    if(this.data.loggedin.value) {
      console.log(this.auth.isAdmin);
      if(this.auth.isAdmin) {
        return true;
      }
    }
    this.router.navigate(['/dashboard']);
    return false;
    
  }
}
