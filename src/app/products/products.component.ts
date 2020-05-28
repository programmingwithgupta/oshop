import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products : Product[] = [];
  category : string;
  filteredProducts : Product[];
  cart ;
  subscription : Subscription;

  constructor(private productService : ProductService,
    private cartService : ShoppingCartService,
     route : ActivatedRoute) { 
       route.queryParamMap.subscribe(params =>{
         this.category = params.get('category');

         this.filteredProducts = (this.category)?
         this.products.filter(p=> p.category == this.category): this.products
       })
     }


  async ngOnInit() {
    this.productService.getAll().subscribe(products =>
      this.filteredProducts= this.products = products);  

      this.subscription = await (await this.cartService.getCart()).subscribe(cart => this.cart = cart)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
