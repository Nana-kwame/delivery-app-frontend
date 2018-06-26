import { RestaurantPage } from './../restaurant/restaurant';
import { Restaurant } from './../../../src/assets/data/restuarants.interface';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';



@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage implements OnInit {

  selectedRes: Restaurant[];

  listGroup: { category: string, restaurants: Restaurant[], icon: string };
  restaurantPage = RestaurantPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public resService: RestaurantsProvider) { }


  ngOnInit() {
    this.listGroup = this.navParams.data;
  }

  onViewMenu(selectedRes: Restaurant) {
    this.getMenu();
    this.navCtrl.push(this.restaurantPage, selectedRes);
  }

  getMenu() {
    this.selectedRes = this.resService.getSelectedRes()
  }

}
