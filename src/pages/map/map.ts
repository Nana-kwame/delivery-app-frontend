import { GoogleMapProvider } from './../../providers/google-map/google-map';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { RidersProvider } from '../../providers/riders/riders';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public maps: GoogleMapProvider,
    public platform: Platform,
    public riders: RidersProvider) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {

      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
      let ridersLoaded = this.riders.load();

      Promise.all([
        mapLoaded,
        ridersLoaded
      ]).then((result) => {
        let riders = result[1];

        for(let rider of riders){
          this.maps.addMarker(rider.latitude,rider.longitude)
          this.maps.addMarkerContent(rider.latitude,rider.longitude);
        }
      })
      
    })
  }

  
}
