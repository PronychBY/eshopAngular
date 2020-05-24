import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product-page/product.service';
import { Product } from '../../entity/product';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  product: Product = new Product;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  addProduct() {
    this.productService.addProduct(this.product).subscribe((result) => {
      console.log("add prod----" + result);
    }, () => {
      console.log("bad res add prod----");
    });
  }




}
