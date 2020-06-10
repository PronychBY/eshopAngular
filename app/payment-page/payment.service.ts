import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Payment } from '../entity/payment';
import { Order } from '../entity/order';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  payment:Payment;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthService
  ) { }

  getOrders() {
    console.log("Inside getOrders():::::")
    if (this.authenticationService.isUserLoggedIn())
      return this.http.get<any>("http://localhost:8080/eshop/order/depts",
        { headers: { authorization: this.authenticationService.getToken() } });

    console.log("end of getOrders():::::");

  }

  sendPayment(order: any) {
    console.log("Inside sendPayment():::::")
    this.payment = new Payment();
    //this.payment.id = order.id;
    this.payment.name = order.name;
    this.payment.orderId = +order.id;
    this.payment.sum = order.sumOfOrder - order.sumOfPayment;
    this.payment.userId = this.authenticationService.getCurrentUserId();

    let body = JSON.parse(JSON.stringify(this.payment));
    if (this.authenticationService.isUserLoggedIn()) {
      return this.http.post<any>("http://localhost:8080/eshop/payment/add", body
        , { headers: { authorization: this.authenticationService.getToken() } });
        
    }
  }

}
