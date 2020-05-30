import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product-page/product.service';
import { Product } from '../../entity/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products : Product[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getAllProducts();
  }

  ngOnDesroy() {
  }

  getAllProducts(): void {
    console.log("inside the dashboard getAllProducts():::::::");
    this.productService.getProducts()
      .subscribe((data) => {this.products = data;},
        (error) => {
          console.log(error);
        }
      );
      
  }


  remove (id) {
    this.productService.deleteProduct(id).subscribe((result)=>console.log(result),
    (error)=>console.log(error));
    this.getAllProducts();
  }

}
