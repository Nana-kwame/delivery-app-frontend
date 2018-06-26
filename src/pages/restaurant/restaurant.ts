import { MapPage } from './../map/map';
import { Restaurant } from './../../assets/data/restuarants.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { OrderPage } from '../order/order';



@IonicPage()
@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {

  order: any[] = [];
  name: string;
  logo: string;
  menu: string[];
  location: string;
  checked: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private resService: RestaurantsProvider) {

  }

  ionViewDidLoad() {
    this.name = this.navParams.get('name');
    this.logo = this.navParams.get('logo');
    this.location = this.navParams.get('location');
    this.menu = this.navParams.get('menu');
  }

  onAddToCart() {
    const alert = this.alertCtrl.create({
      title: 'Order Food',
      message: 'Are you sure you want to add this to your order ?',
      cssClass: 'buttonCss',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            this.presentModal();
            //this.tapItem(this.menu);
          }
        },
        {
          text: 'No, I changed my mind ',
          role: 'destroy',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    });

    alert.present();
  }

  tapItem(order: any) {
    const index: number = this.menu.indexOf(order);
    const index2: number = this.order.indexOf(order)
    if (index !== -1 && index !== index2) {
      this.order.push(order)
      console.log('Added to order ', this.order)
      console.log('Testing ', index2)
    } else if(index !== -1 || index == index2){
      this.order.splice(index2, this.order.length)
    }
  }

  presentModal() {
    let orderModal = this.modalCtrl.create(OrderPage, {
      order: this.order,
      name: this.name
    });
    orderModal.present();
  }

  onRemoveFromOrder(menu: Restaurant) {
    this.resService.removeOrder(menu);
  }

  isOrdered(menu: Restaurant) {
    return this.resService.isResOrdered(menu);
  }


}
