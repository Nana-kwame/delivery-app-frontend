import { Restaurant } from '../../../www/assets/data/restuarants.interface';
import { Order } from '../../assets/data/order.interface';



export class RestaurantsProvider {
private selectedRes: Restaurant[]= [];
private orders: Order[] = [];

addOrderToCart( restaurant: Restaurant[]){
  this.selectedRes.push(...restaurant);
  console.log(this.selectedRes);
}

addOrder( items: Order){
  this.orders.push(items);
}

getSelectedRes(){
  return this.selectedRes.slice();
}

  removeOrder(restaurant: Restaurant){
    const position = this.selectedRes.findIndex((resEl: Restaurant)=>{
      return resEl.id == restaurant.id
    });
    this.selectedRes.splice(position, 1);
  }

  isResOrdered(restuarant: Restaurant){
    return this.selectedRes.find((resEl: Restaurant) =>{
      return resEl.id == restuarant.id;
    })
  }

  getOrder(){
    //return this.selectedRes.slice();
    return this.orders.slice();
  }

}
