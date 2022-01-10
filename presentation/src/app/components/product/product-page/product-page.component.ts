import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService
  ) {
    productService.findOne(this.route.snapshot.params.reference)
  }

  ngOnInit(): void {
  }

}
