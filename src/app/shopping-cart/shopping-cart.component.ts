import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  shoppingcartItemCount;

  constructor(private shoppingCartService : ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    // this.cart$.subscribe(cart=>{
    //   this.shoppingcartItemCount = 0;
    //   for(let productId in cart.items){
    //     this.shoppingcartItemCount += cart.items[productId].quantity;
    //   }
    // })
  }

}
