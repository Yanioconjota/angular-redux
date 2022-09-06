import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://reqres.in';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.url}/api/users?per_page=6&delay=1`)
      .pipe(
        map((resp: any) => resp.data)
      );
  }

  getUserById(id: string) {
  return this.http.get(`${this.url}/api/users/${id}`)
  }
}
