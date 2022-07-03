import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private storageService: LocalStorageService,
    private router: Router,
    private messageService: MessageService
  ) {}

  canActivate(): boolean {
    const token = this.storageService.getToken();

    if (token) {
      const tokenInfo = JSON.parse(atob(token.split('.')[1]));
      if (tokenInfo && tokenInfo.isAdmin && !this._checkTokenExpiration(tokenInfo.exp)) {
        return true;
      }
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'User is not authorised!'
    });
    this.router.navigate(['login']);
    return false;
  }

  private _checkTokenExpiration(time: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= time;
  }
}
