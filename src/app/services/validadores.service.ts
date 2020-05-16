import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noGavilan( control: FormControl ): {[s:string]: boolean} {
    
    if( control.value?.toLowerCase() === 'gavilan') {
      return {
        noGavilan: true
      }
    }

    return null;
  }
}
