import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../entity/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  BASE_PATH = 'http://localhost:8080'
  SIGN_IN_PATH = this.BASE_PATH + '/eshop/api/auth/signin'
  SIGN_UP_PATH = this.BASE_PATH + '/eshop/api/auth/signup'
  USERLIST_PATH = this.BASE_PATH + '/eshop/user/list'
  USERGETBYNAME_PATH = this.BASE_PATH + '/eshop/user/getbyname'
  ISADMIN_PATH = this.BASE_PATH + '/eshop/user/isadmin'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String;
  public password: String;
  public name: String;
  public email: String;
  public role: String;
  public ff;
  isCurUserAdmin: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  authenticationService(username: String, password: String) {
    return this.http.post<any>(this.SIGN_IN_PATH, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        //localStorage.setItem('currentUser', JSON.stringify(user));
        this.getUserByName(username);
        console.log('currentUser');
        console.log(localStorage.getItem('currentUser'));
        this.isAdmin(JSON.parse(localStorage.getItem('currentUser'))).subscribe(
          result => this.isCurUserAdmin = result,
          (error) => console.log(error)
        );
        localStorage.setItem('token', user.accessToken);
        localStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, user);

        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username);
        //console.log(user);
        //console.log("ls:" + localStorage.getItem('currentUser'));
        console.log("token:" + localStorage.getItem('token'));
        return user;
      }));
  }

  getToken() {

    return "Bearer " + localStorage.getItem('token');
  }

  registerSuccessfulLogin(username) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
    localStorage.removeItem('token');

    this.router.navigate(['/sign-in']);

  }

  isUserLoggedIn() {
    //console.log(sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME));
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  isAdmin(user) {
    console.log("Inside isAdmin():::::")
    return this.http.post<any>(this.ISADMIN_PATH, user);
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }

  getLoggedInCurrentUser() {
    let user = sessionStorage.getItem('currentUser')
    if (user === null) return ''
    return user
  }

  signUp(username: String, password: String, name: String, email: String, role: String) {
    //signUpNN(){

    //console.log("signup begin "+username +" "+name+" "+password+" "+email+" "+role);
    //return this.http.get<any>(`http://localhost:8080/controller/product/list`);
    //return this.http.get("http://jsonplaceholder.typicode.com/users");
    //return this.http.post<any>(`http://localhost:8080/controller/api/auth/test`,{ name, username, email, password });
    //return this.http.post<any>(`http://localhost:8080/controller/api/auth/test`,{name, username, email, password });
    return this.http.post<any>(this.SIGN_UP_PATH, { name, username, email, password });
  }

  getUsers() {
    console.log("Inside getUsers():::::")
    return this.http.get<any>(this.USERLIST_PATH);
    //console.log("end of getUsers():::::");


  }

  getUserByName(name: String) {
    console.log("Inside getUserByName():::::")
    return this.http.post<any>(this.USERGETBYNAME_PATH, { name })
      .subscribe(result => {
        console.log('user:');
        console.log(result);
        localStorage.setItem('currentUser', JSON.stringify(result));
      }
      );


  }





}
