import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class RidersProvider {

  data: any;

  constructor(public http: Http) {
    console.log('Hello RidersProvider Provider');
  }

  load() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('assets/data/riders.json').map(res => res.json()).subscribe(data => {

        this.data = this.applyHaversine(data.riders);

        this.data.sort((locationA, locationB) => {
          return locationA.distance - locationB.distance;
        });

        resolve(this.data);
      });

    });

  }


  applyHaversine(riders) {

    let usersLocation = {
      lat: 5.5566488,
      lng: -0.1754233
    };

    riders.map((rider) => {

      let riderLocation = {
        lat: rider.latitude,
        lng: rider.longitude
      };

      rider.distance = this.getDistanceBetweenPoints(
        usersLocation,
        riderLocation,
        'miles'
      ).toFixed(2);
    });

    return riders;
  }

  getDistanceBetweenPoints(start, end, units) {

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'miles'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x){
    return x * Math.PI / 180;
}

}
