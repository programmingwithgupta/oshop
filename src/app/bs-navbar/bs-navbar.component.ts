import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  user : firebase.User;
  constructor(private afauth : AngularFireAuth) {
    afauth.authState.subscribe(user=> this.user = user);
   }

  ngOnInit() {
  }
  logout(){
    this.afauth.auth.signOut();
  }

}
