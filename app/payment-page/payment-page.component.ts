import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from './payment.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {
  orders = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //this.getAllOrders();
    this.getAllCurentUserOrders();
  }

  addPayment(order) {
    //console.log("user:")
    //console.log(this.authService.getCurrentUserId());
    //console.log(localStorage.getItem('isCurentUserAdmin'));
    //console.log(localStorage.getItem('currentUser'));

    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/sign-in']);;
    }
    console.log("inside addPayment():::::::");
    this.paymentService.sendPayment(order)
    .subscribe((result) => {
      this.getAllCurentUserOrders();
      console.log(result);
    },
      (error) => {
        console.log(error);
      }
    );

  }

  getAllOrders() {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/sign-in']);;
    }
    console.log("inside getAllOrders():::::::");
    this.paymentService.getOrders()
      .subscribe((data) => {
        this.orders = data;
        //console.log('Data get---');
        //console.log(data)
      },
        (error) => {
          console.log(error);
        }
      );

  }

  getAllCurentUserOrders() {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/sign-in']);;
    }
    console.log("inside getAllCurentUserOrders():::::::");
    this.paymentService.getOrders()
      .subscribe((data) => {
        this.orders = [];
        //console.log(data);
        
        for (var key in data) {
          if (data[key]["userId"] == this.authService.getCurrentUserId()) {
            this.orders.push(data[key]);
          }
        }
        //this.orders = data;
        //console.log('Data get---');
        //console.log(data)
      },
        (error) => {
          console.log(error);
        }
      );

  }

}
