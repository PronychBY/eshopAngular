import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../entity/user';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  users: User[] = [];
  constructor(
    private authenticationService: AuthService

  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    console.log("inside the service getAllUsers():::::::");
    this.authenticationService.getDepts()
      .subscribe((data) => {this.users = data;console.log(data)},
        (error) => {console.log(error);this.getAllUsers()
        }
      );
  }

  blockUser(user){
    console.log("inside blockUser():::::::");
    this.authenticationService.blockUser(user)
    .subscribe((result)=>{
      this.getAllUsers()
    },
    (error)=>{console.log(error);this.getAllUsers()});
;
    
  }

  unblockUser(user){
    console.log("inside unblockUser():::::::");
    this.authenticationService.unblockUser(user)
    .subscribe((result)=>{this.getAllUsers()},
    (error)=>{console.log(error);});
  }

}
