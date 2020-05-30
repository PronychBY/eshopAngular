import { Component, OnInit } from '@angular/core';
import { Product } from '../../entity/product';
import { ProductService } from '../../product-page/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  product: Product = new Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        return this.productService.getById(params['id'])
      })
    ).subscribe(prod=>this.product =prod);

  }

  updateProduct() {
    this.productService.updateProduct(this.product).subscribe((result) => {
      console.log("update prod----");
      console.log(result);
      this.router.navigate(['/admin','dashboard']);
    }, (error) => {
      console.log("bad res update prod----");
      console.log(error);
      this.router.navigate(['/admin','dashboard']);
    });
  

  }


}
