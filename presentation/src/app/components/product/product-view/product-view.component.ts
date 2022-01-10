import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  @Input() reference!: number;
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getById();
  }

  getById() {
    this.reference = this.route.snapshot.params['reference'];
    this.productService.findOne(this.reference).subscribe((result) => {
      this.product = result;
    });
  }
}
