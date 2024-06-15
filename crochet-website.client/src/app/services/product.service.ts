import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { IImage } from '../interfaces/IImage';
import { IProductTypesResponse } from '../interfaces/IProductTypes';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = `${environment.apiUrl}/api`;
  constructor(private http: HttpClient) { }

  getProductTypes(): Observable<IProductTypesResponse[]> {
    return this.http.get<IProductTypesResponse[]>(`${this.apiUrl}/products/getTypes`);
  }

  getProductsPerType(productType: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/products/getProductsByType/${productType}`);
  }

  getProductDetailsByType(productType: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/products/getProductDetailsByType/${productType}`);
  }

  getImagesPerID(productID: number): Observable<IImage[]> {
    return this.http.get<IImage[]>(`${this.apiUrl}/products/getImagesByID/${productID}`);
  }

  search(searchItem: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/products/search`, { params: { searchItem: searchItem } });
  }
}
