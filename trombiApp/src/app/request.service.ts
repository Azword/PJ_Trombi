import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RequestService {

  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) { }

  login(username: string, password: string) {
    var url: string = "/api/login";
    return this.http.post(url, JSON.stringify({password: password, username: username}), {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(reason => reason.json());
  }

  getAll() {
    var url: string = "/api/search";
    return (this.http.get(url, {headers: this.headers}))
      .toPromise()
      .then(response => response.json())
      .catch(reason => reason.json());
  }

  getUser(body) {
    var url: string = "/api/search";
    return (this.http.post(url, body,{headers: this.headers}))
      .toPromise()
      .then(response => response.json())
      .catch(reason => reason.json());
  }

  updateUser(body) {
    var url: string = "/api/update";
    return (this.http.post(url, body,{headers: this.headers}))
      .toPromise()
      .then(response => response.json())
      .catch(reason => reason.json());
  }

}
