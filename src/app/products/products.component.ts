import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Product[] = [];
  category : string;
  filteredProducts : Product[];
  cart$ : Observable<ShoppingCart>;
  subscription : Subscription;

  constructor(private productService : ProductService,
    private cartService : ShoppingCartService,
     private route : ActivatedRoute) { 
       
     }


  async ngOnInit() {

    this.productService.getAll().subscribe(products =>{
      this.products = products
      this.route.queryParamMap.subscribe(params =>{
        this.category = params.get('category');
        this.applyFilter();     
      })
    }); 
    this.cart$ =  await this.cartService.getCart();
  }

  private populateProducts(){
    this.productService.getAll().switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
    .subscribe(params =>{
      this.category = params.get('category');
      this.applyFilter();     
    });
  }
  private applyFilter(){
    this.filteredProducts = (this.category)?
    this.products.filter(p=> p.category == this.category): this.products
  }

}
