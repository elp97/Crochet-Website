import { Component, OnInit } from '@angular/core';
import { Observable, catchError, empty, map, of } from 'rxjs';
import { ProductService } from '../services/product.service';
import { DataMapperService } from '../services/data-mapper.service';
import { Router } from '@angular/router';
import { IProductTypes, IProductTypesResponse } from '../interfaces/IProductTypes';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  standalone: true,
  imports: [MatGridListModule, NgOptimizedImage, AsyncPipe]
})
export class ProductListComponent implements OnInit {
  constructor(private router: Router, private productSrv: ProductService, private dataMapperSrv: DataMapperService) { }

  productsList$!: Observable<IProductTypes[]>;

  ngOnInit(): void {
    this.getProductTypes();
  }

  selectProduct(event: string) {
    this.router.navigate([`/product`, { productType: event.toLowerCase() }]);
  }

  getProductTypes() {
    this.productsList$ = this.productSrv.getProductTypes().pipe(
      map((productTypes: IProductTypesResponse[]) => this.dataMapperSrv.formatProductTypesData(productTypes)),
      catchError((error, caught) => {
        console.error("Product Types Error: ", error);
        return [];
      })
    )
  }

}
