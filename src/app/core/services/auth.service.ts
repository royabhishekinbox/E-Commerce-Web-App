import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  register(user: any) {

    if (!this.isBrowser()) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));
  }

  login(email: string, password: string): boolean {

    if (!this.isBrowser()) return false;

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      return true;
    }

    return false;
  }

  logout() {

    if (!this.isBrowser()) return;

    localStorage.removeItem('loggedInUser');
  }

  isLoggedIn(): boolean {

    if (!this.isBrowser()) return false;

    return localStorage.getItem('loggedInUser') !== null;
  }

  getUser() {

    if (!this.isBrowser()) return null;

    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }

}