import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product-page/product.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {
  orders = []
  constructor(
    private productService: ProductService,
    private authService: AuthService
  
  ) { }

  ngOnInit() {
    this.getAllOrders();

  }
  
  getAllOrders() {
    console.log("inside the getAllOrders():::::::");
    if (!this.authService.isUserLoggedIn()) return;
    
    this.productService.getOrders()
      .subscribe((data) => {
        this.orders = data;
        console.log(data)
      },
        (error) => {
          console.log(error);
        }
      );
      
  }

}
