import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-page/product.service' 
import { Order } from '../entity/order';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  totalPrice = 0
  order: Order = new Order();
  
  constructor(
    private productServ : ProductService
  ) { }

  ngOnInit() {
    this.order.products = this.productServ.cartProducts
    this.order.user = JSON.parse(localStorage.getItem('currentUser'));
    for (let i = 0; i < this.order.products.length; i++) {
      this.totalPrice += +this.order.products[i].price
    }

  }

  deleteFromChart(index){
    this.productServ.deleteFromChart(index);
  }

  delete(product) {
    this.totalPrice -= +product.price
    this.order.products.splice(this.order.products.indexOf(product), 1)
  } 

  sendOrderToServer(){
    console.log(this.order);
    this.productServ.sendOrder(this.order).subscribe((result)=>console.log(result),(error)=>console.log(error));
    console.log("send order");
  }
}