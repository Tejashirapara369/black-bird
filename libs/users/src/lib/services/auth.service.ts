import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = `${environment.apiURL}users`;
  constructor(private http: HttpClient, private router: Router, private storageService: LocalStorageService) {}

  login(email: string, password: string) {
    return this.http.post<{ email: string; success: boolean; token: string }>(
      `${this.apiURL}/login`,
      { email, password }
    );
  }

  logout() {
    this.storageService.removeToken();
    this.router.navigate(['/login']);
  }
}
