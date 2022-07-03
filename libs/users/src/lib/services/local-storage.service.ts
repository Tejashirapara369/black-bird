import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  getToken() {
    return localStorage.getItem(TOKEN) as string;
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN, token);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }
}
