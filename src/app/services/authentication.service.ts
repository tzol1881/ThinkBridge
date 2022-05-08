import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate() {
    return fetch('https://fakestoreapi.com/users');
  }
}
