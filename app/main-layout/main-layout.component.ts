import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../entity/user';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(
    public authService:AuthService
    ) { }

  ngOnInit(): void {
    console.log(' in main layout component ::::::::::::')
  }

  Logout(){
    this.authService.logout();  
  }

}
