import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = "http://localhost:5000/api/users";

  constructor(private http: HttpClient) {}

getHeaders() {

  const token = localStorage.getItem("token");

  return {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  };
}

  // READ
 getUsers() {
  return this.http.get(this.api, this.getHeaders());
}
  // CREATE
  createUser(data: any) {
   return this.http.post(this.api, data, this.getHeaders());
  }

  // UPDATE
  updateUser(id: number, data: any) {
    return this.http.put(
  `${this.api}/${id}`,
  data,
  this.getHeaders()
);
  }

  // DEACTIVATE USER
  deactivateUser(id: number) {
   return this.http.patch(
  `${this.api}/deactivate/${id}`,
  {},
  this.getHeaders()
);
  }

  // ACTIVATE USER
  activateUser(id: number) {
 return this.http.patch(
  `${this.api}/activate/${id}`,
  {},
  this.getHeaders()
);
}

  // LOGIN PAGE
login(email: string, password: string) {
  return this.http.post("http://localhost:5000/api/auth/login", {
    email,
    password
  });
}
}