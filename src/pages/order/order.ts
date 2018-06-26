import { SlydepayProvider } from './../../providers/slydepay/slydepay';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController, ActionSheetController, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})

export class OrderPage {
  orders: any[]
  name: string;
  quantity: number[];
  userName: string;
  phoneNumber: string;
  latitude: number;
  longitude: number;
  disabled: boolean = false;
  invoiceDetails: any;
  payOption: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public slyde: SlydepayProvider,
    public http: Http) {
    this.ionViewDidLoad();

  }

  ionViewDidLoad() {
    this.orders = this.navParams.get('order');
    this.name = this.navParams.get('name');

    if (this.orders.length == 0) {
      this.disabled = true;
    } else {
      this.quantity = new Array(this.orders.length);
      this.quantity = this.quantity.map((el: any) => 0);

    }
    console.log('ionViewDidLoad OrderPage', this.name);
    console.log("ORDER PAGE: ", this.orders)
  }

  itemCounter(index: number) {
    this.quantity[index] += 1;
  }

  onRemoveOrder(order: any) {
    const index: number = this.orders.indexOf(order);
    if (index !== -1) {
      this.orders.splice(index, 1);
    }
  }

  onDismiss() {
    this.viewCtrl.dismiss();
  }

  showLoader() {
    const loader = this.loadCtrl.create({
      content: "Getting your location...",
      duration: 3000
    });
    loader.present()
  }

  onLocate() {
    this.showLoader()
    this.geolocation.getCurrentPosition().then((res) => {
      this.latitude = res.coords.latitude
      this.longitude = res.coords.longitude

    }).catch((err) => {
      console.log(err)
    })
  }

  makeOrder() {
    let details = {
      userName: this.userName,
      phoneNumber: this.phoneNumber,
      restuarant: this.name,
      order: this.orders + " " + this.quantity,
      latitude: this.latitude,
      longitude: this.longitude
    }

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    this.http.post('http://localhost:4040/orders', JSON.stringify(details), { headers: headers }).subscribe(res => {
      console.log(res)
      this.onDismiss();

      let toast = this.toastCtrl.create({
        message: "Sit tight your order is on it's way",
        duration: 2000
      });
      toast.present();
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: "There is a mixup in your order please check the items again",
        duration: 2000
      });
      toast.present();
      console.log(JSON.stringify(err));
      this.onDismiss()
    })
  }

  onOrder(details) {
    this.presentActionSheet(details)
  }


  presentActionSheet(details) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'How would you like to pay',
      buttons: [{
        text: 'Pay Cash',
        handler: () => {
          this.makeOrder()
        }
      }, {
        text: 'Pay online',
        handler: () => {
          this.onAlert(details)
        }
      }

      ]
    })
    actionSheet.present()
  }

  getAmount() {
    let amount = this.orders.forEach((el) => {
      el = el.replace(/^\D+/g, '')
    })
    console.log(amount)
    return amount
  }

  onInvoice(details) {
    this.invoiceDetails = {
      emailOrMobileNumber: 'kingcode01@gmail.com',
      merchantKey: '1527702629234',
      amount: 35,
      orderCode: this.makeid(),
      // description: "Hope this works",
      sendInvoice: true,
      payOption: this.payOption,
      customerName: this.userName,
      customerEmail: this.phoneNumber
    }

    // this.slyde.createInvoice(this.invoiceDetails).then((res) => {
    //   console.log(res);
    //   //this.makeOrder()

    // }, (err) => {
    //   console.log(err)
    // })


  }


  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  onAlert(details) {
    let alert = this.alertCtrl.create({
      title: 'What option would you like to use?',
      inputs: [
        {
          type: 'radio',
          label: 'VISA',
          value: 'ZENITH_VISA',
        }, {
          type: 'radio',
          label: 'MTN Mobile Money',
          value: 'MTN_MONEY',
        }, {
          type: 'radio',
          label: 'SLYDEPAY',
          value: 'SLYDEPAY',
        }
      ],
      buttons: [{
        text: 'Cancel',
        role: 'destructive',
        handler: data => {
          console.log('Cancel clicked')
        }
      }, {
        text: 'Submit',
        handler: (data: string) => {
          console.log('PayOption ', data)
          this.payOption = data;
          this.onInvoice(details)
        }
      }]
    })
    alert.present()
  }


}
