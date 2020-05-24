import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Product[] = [];

  category : string;
  filteredProducts : Product[];
  constructor(private productService : ProductService,
     route : ActivatedRoute) { 
       route.queryParamMap.subscribe(params =>{
         this.category = params.get('category');

         this.filteredProducts = (this.category)?
         this.products.filter(p=> p.category == this.category): this.products
       })
     }


  ngOnInit() {
    this.productService.getAll().subscribe(products =>
      this.filteredProducts= this.products = products);  
  }

}
