import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/product'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products : Product[];
  filteredProducts : Product[];
  subscription : Subscription;

  constructor(private productService : ProductService) { 
    this.subscription = this.productService.getAll().subscribe( products=>
      this.filteredProducts = this.products = products
    )
  }

  ngOnInit() {
   
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(query){
    this.filteredProducts = query?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
    
  }

}
