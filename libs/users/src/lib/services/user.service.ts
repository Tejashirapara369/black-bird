import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '../models/user';
import * as countryLibs from 'i18n-iso-countries';

declare const require: (arg0: string) => countryLibs.LocaleData;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = `${environment.apiURL}users`;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.apiURL);
  }

  getUserById(userId: string) {
    return this.http.get<User>(`${this.apiURL}/${userId}`);
  }

  createUser(user: User) {
    return this.http.post<User>(this.apiURL, user);
  }

  updateUser(userId: string, user: User) {
    return this.http.put<User>(`${this.apiURL}/${userId}`, user);
  }

  deleteUser(userId: string) {
    return this.http.delete<unknown>(`${this.apiURL}/${userId}`);
  }

  getCountryList() {
    countryLibs.registerLocale(require('i18n-iso-countries/langs/en.json'));
    return Object.entries(countryLibs.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }
}
