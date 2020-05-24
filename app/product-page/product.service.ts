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
  cartProducts=[]
  constructor(
    private http: HttpClient, 
    private router: Router,
    private authenticationService:AuthService
    ) { }

  getProducts() {
    console.log("Inside getProducts():::::")
    if (this.authenticationService.isUserLoggedIn())
      return this.http.get<any>("http://localhost:8080/eshop/product/list",
        { headers: { authorization: this.authenticationService.getToken() } });
    console.log("end of getProducts():::::");
  }

  addProduct(product: Product) {
    console.log('add product'+product);
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

  addToChart (product) {
    this.cartProducts.push(product)
  } 

}
