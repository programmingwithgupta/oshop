import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  user : firebase.User;
  shoppingcartItemCount : number ;
  cart$ : Observable<ShoppingCart>;

  constructor(private afauth : AngularFireAuth,
    private shoppingcartService : ShoppingCartService) {

   }

  async ngOnInit() {
    this.afauth.authState.subscribe(user=> this.user = user);

     this.cart$ = await this.shoppingcartService.getCart();
    // cart$.subscribe(cart=>{
    //   this.shoppingcartItemCount = 0;
    //   for(let productId in cart.items){
    //     this.shoppingcartItemCount += cart.items[productId].quantity;
    //   }
    // })

  }
  logout(){
    this.afauth.auth.signOut();
  }

}
