import { ConnectivityProvider } from './../connectivity/connectivity';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';


declare var google

@Injectable()
export class GoogleMapProvider {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapIntialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = []
  apiKey: string;

  constructor(public connectivityService: ConnectivityProvider, private geolocation: Geolocation) {

  }

  init(mapElement: any, pleaseConnect): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();
  }

  loadGoogleMaps() {

    return new Promise((res) => {

      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if (this.connectivityService.isOnline()) {

          window['mapInit'] = () => {
            this.initMap().then(() => {
              res(true)
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps"

          if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }
          document.body.appendChild(script);
        }
      }
      else {

        if (this.connectivityService.isOnline()) {
          this.initMap();
          this.enableMap();
        } else {
          this.disableMap()
        }
      }

      this.addConnectivityListeners();
    })
  };

  initMap(): Promise<any> {

    this.mapIntialised = true;

    return new Promise((res) => {

      this.geolocation.getCurrentPosition().then((position) => {

        //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let latLng = new google.maps.LatLng(5.5566488, -0.1754233);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        res(true);
      })
    })
  }

  disableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }
  }

  enableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }
  }

  addConnectivityListeners(): void {

    document.addEventListener('online', () => {

      console.log("online");

      setTimeout(() => {

        if (typeof google == "undefined" || typeof google.maps == 'undefined') {
          this.loadGoogleMaps();
        }
        else {
          if (!this.mapIntialised) {
            this.initMap()
          }

          this.enableMap();
        }
      }, 2000);
    }, false);

    document.addEventListener('offline', () => {

      console.log('offline');

      this.disableMap();
    }, false)
  }

  addMarker(lat: number, lng: number): void {
    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    this.markers.push(marker);
  }

  addMarkerContent(lat: number, lng: number) {
    let latLng = new google.maps.LatLng(lat, lng);


    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    let content = "<button (click)='startNav()'>Information!</button>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: ""
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.setContent('<button (click)="startNav()"> Start nav</button>')
      infoWindow.open(this.map, marker);
    });
    google.maps.event.trigger(marker, 'click')

  }

  startNav(){
    console.log('Start nav');
  }
}
