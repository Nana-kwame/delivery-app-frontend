import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SlydepayProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SlydepayProvider {

  constructor(public http: Http) {
    
  }

  showPayment(details) {

    return new Promise((resolve, reject)=> {

      let headers = new Headers()

      headers.append('Content-Type', 'application/json')

      this.http.post('https://app.slydepay.com.gh/api/merchant/invoice/payoptions', JSON.stringify(details), {headers: headers})
      .subscribe(res => {

        let data = res.json()
        resolve(data.result)
      },(err)=> {
        reject(err)
      })

    })
  }

  createInvoice(details){
    return new Promise ((resolve, reject)=> {
      let headers = new Headers()

      headers.append('Content-Type', 'application/json')

      this.http.post("https://app.slydepay.com.gh/api/merchant/invoice/create", JSON.stringify(details), {headers:headers})
      .subscribe(res => {

        let data = res.json()
        resolve(data.result)
      }, (err)=> {
        reject(err)
      })
    })

  }

  checkPayment(details){
    return new Promise((resolve, reject)=> {

      let headers = new Headers()

      headers.append('Content-Type', 'application/json')

      this.http.post("https://app.slydepay.com.gh/api/merchant/invoice/checkstatus", JSON.stringify(details), {headers:headers})
      .subscribe(res => {

        let data = res.json()
        resolve(data.result)
      }, (err)=> {
        reject(err);
      })
    })
  }

}
