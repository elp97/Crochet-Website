import { Injectable } from '@angular/core';
import { IProductTypes, IProductTypesResponse } from '../interfaces/IProductTypes';

@Injectable({
  providedIn: 'root'
})
export class DataMapperService {

  constructor() { }

  formatProductTypesData(input: IProductTypesResponse[]): IProductTypes[] {
    const colourSelection: string[] = ["#d1a7c8", "#a7c7d1", "#acd1a7"];
    return input.map(item => {
      return {
        ...item,
        background: colourSelection[this.randomInteger(1, colourSelection.length - 1)],
        productImage: `../../assets/images/${item.type.toLowerCase()}/${item.type.toLowerCase()}_group.JPG`
      }
    })
  }

  //used to select random from colour array
  randomInteger(min: number = 1, max: number = 5): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
