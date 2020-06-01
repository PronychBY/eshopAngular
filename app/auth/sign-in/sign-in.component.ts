import { Component, OnInit } from '@angular/core';
import { User } from '../../entity/user';
import { AuthService } from '../auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  users: User[];
  login: string = 'test1';
  password: string = 'test1';
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) { }

  ngOnInit() {
    console.log("calling ngOnInitUser()::::");
    this.getAllUsers();

  }

  testLogin() {
    console.log("calling handle login----" + this.authenticationService.getLoggedInUserName());
  }
  test2Login() {
    console.log("calling2 handle login----" + this.authenticationService.isUserLoggedIn());
    console.log(this.users);
  }

  test3Login() {
    console.log("calling3----");
    this.authenticationService.getUserByName('test7');

    console.log("loc storage----");
    console.log(localStorage.getItem('currentUser'));
    
    this.authenticationService.isAdmin(JSON.parse(localStorage.getItem('currentUser')))
    .subscribe(result=>console.log(result));
    //console.log(this.authenticationService.isAdmin(JSON.parse(localStorage.getItem('currentUser'))));

  }

  handleLogin() {
    console.log("calling handle login----");

    this.authenticationService.authenticationService(this.login, this.password).subscribe((result) => {
      console.log("calling handle login----" + result.accessToken);
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      console.log("successful logincalling ----" );
      this.router.navigate(['/product']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }

  getAllUsers(): void {
    console.log("inside the service getAllUsers():::::::");
    this.authenticationService.getUsers()
      .subscribe((data) => this.users = data,
        (error) => {
          console.log(error);
        }
      );


  }
}
