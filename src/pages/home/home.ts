import { OrdersPage } from './../orders/orders';
import { RestaurantsPage } from './../restaurants/restaurants';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root : any = RestaurantsPage;
  tab2Root : any = OrdersPage;

  constructor(public navCtrl: NavController) {

  }

}
