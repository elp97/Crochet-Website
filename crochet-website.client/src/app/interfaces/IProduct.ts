import { IImage } from './IImage';
export interface IProduct {
  productID: number,
  name: string,
  price: number;
  description_Small: string;
  description_Long?: string;
  images?: IImage[];
}
