import { Pipe, PipeTransform } from '@angular/core';
import {BookingDetail} from './../booking-details/view-booking/booking-detail.model';
import { from } from 'rxjs';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: BookingDetail[], search: any): any {

    if(search){
      search = search.toLowerCase();
      return value.filter(function(x){
        return x.mobileNumber.toString().toLowerCase().indexOf(search)>-1;
      })
    }
    return value;
     }

}
