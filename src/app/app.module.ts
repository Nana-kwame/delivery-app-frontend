import { Network } from '@ionic-native/network';
import { MapPage } from './../pages/map/map';
import { RestaurantPage } from './../pages/restaurant/restaurant';
import { OrdersPage } from './../pages/orders/orders';
import { RestaurantsPage } from './../pages/restaurants/restaurants';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GoogleMapProvider } from '../providers/google-map/google-map';
import { RidersProvider } from '../providers/riders/riders';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { RestaurantsProvider } from '../providers/restaurants/restaurants';
import { Geolocation } from '@ionic-native/geolocation';
import { ListPage } from '../pages/list/list';
import { HttpModule } from '@angular/http';
import { OrderPage } from '../pages/order/order'; 
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { SlydepayProvider } from '../providers/slydepay/slydepay';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    RestaurantsPage,
    RestaurantPage,
    OrdersPage,
    OrderPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    RestaurantsPage,
    RestaurantPage,
    OrdersPage,
    OrderPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GoogleMapProvider,
    RidersProvider,
    Network,
    Geolocation,
    NativeGeocoder,
    ConnectivityProvider,
    RestaurantsProvider,
    SlydepayProvider
  ]
})
export class AppModule { }
