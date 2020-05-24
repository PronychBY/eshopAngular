import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';
import { Product } from '../entity/product';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  products: Product[];
  quantity:number;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    console.log("calling ngOnInitProducts()::::");
    this.getAllProducts();

  }

  getAllProducts(): void {
    console.log("inside the service getAllProducts():::::::");
    this.productService.getProducts()
      .subscribe((data) => {this.products = data;console.log('Data get---');},
        (error) => {
          console.log(error);
        }
      );
  }

  addToChart(product): void {
    this.productService.addToChart(product);
    //console.log("inside addToChart()::::::::::::"+productId)
  }

}