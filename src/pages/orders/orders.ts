import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Restaurant } from './../../assets/data/restuarants.interface';
import { Order } from '../../assets/data/order.interface';



@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  orders: Order[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private resService: RestaurantsProvider) {
  }

  ionVieWillEnter() {
   this.orders= this.resService.getOrder();
   console.log("Orders "+this.orders)
  }


  
  }




