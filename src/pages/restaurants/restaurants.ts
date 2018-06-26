import { ListPage } from './../list/list';
import { Restaurant } from './../../../src/assets/data/restuarants.interface';
import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import restuarants from './../../../src/assets/data/restuarants';


@IonicPage()
@Component({
  selector: 'page-restaurants',
  templateUrl: 'restaurants.html',
})
export class RestaurantsPage implements OnInit {

  restuarantGroup : {category:string ,restaurants: Restaurant[], icon: string }[]
  listPage= ListPage
 
  ngOnInit(){
    this.restuarantGroup =  restuarants;
  }


 
}
