import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Product } from '../entity/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartProducts = []
  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthService
  ) { }

  getProducts() {
    console.log("Inside getProducts():::::")
    if (this.authenticationService.isUserLoggedIn())
      return this.http.get<any>("http://localhost:8080/eshop/product/list",
        { headers: { authorization: this.authenticationService.getToken() } });
    console.log("end of getProducts():::::");
  }

  addProduct(product: Product) {
    console.log('add product' + product);
    let body = JSON.parse(JSON.stringify(product));
    console.log(body);

    return this.http.post("http://localhost:8080/eshop/product/add", body,
      { headers: { authorization: this.authenticationService.getToken() } })
      .pipe(map(prod => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        //localStorage.setItem('currentUser', JSON.stringify(user));
        //localStorage.setItem('token', user.accessToken);
        //this.username = username;
        //this.password = password;
        //this.registerSuccessfulLogin(username);
        console.log(prod);
        return prod;
      }));
  }
  
  sendOrder(order: import("../entity/order").Order) {
    console.log('serv send order' + JSON.stringify(order));
    let body = JSON.parse(JSON.stringify(order));
    console.log(body);

    return this.http.post("http://localhost:8080/eshop/order/add", body,
      { headers: { authorization: this.authenticationService.getToken() } });
  }

  updateProduct(product: Product) {
    console.log('update product' + JSON.stringify(product));
    let body = JSON.parse(JSON.stringify(product));
    console.log(body);

    return this.http.post("http://localhost:8080/eshop/product/update", body,
      { headers: { authorization: this.authenticationService.getToken() } });
  }

  deleteProduct(id) {
    console.log('delete product id:' + id);

    return this.http.delete("http://localhost:8080/eshop/product/delete/"+id,
      { headers: { authorization: this.authenticationService.getToken() } });
  }


  addToChart(product) {
    this.cartProducts.push(product)
  }

  deleteFromChart(index) {
    this.cartProducts.splice(index, 1);
  }

  getById(id) {
    if (this.authenticationService.isUserLoggedIn())
      return this.http.get<any>("http://localhost:8080/eshop/product/get/" + id,
        { headers: { authorization: this.authenticationService.getToken() } });
    console.log("end of getById():::::");
  }
}
