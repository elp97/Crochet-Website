import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IImage } from '../interfaces/IImage';
import { IProduct } from '../interfaces/IProduct';
import { Observable, map } from 'rxjs';
import { ProductService } from '../services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CurrencyPipe, AsyncPipe, MatProgressSpinnerModule]
})
export class ProductItemComponent implements OnInit {
  constructor(private productSrv: ProductService, private router: Router) { }

  @Input() productType = "";
  imageLocationPrefix: string = "";
  imageList: IImage[] = [];
  productList: IProduct[] = [];
  selectedProduct: IProduct | null = null;
  selectedImage: IImage | null = null;
  selectedImageID: number = 0;
  defaultImage: IImage = { imageID: -1, imageURL: `../../../../../assets/images/${this.productType}/${this.productType}_group.JPG`, productID: -1 };
  productList$!: Observable<IProduct[]>;
  productTitle: string = this.productType;
  loading: boolean = false;

  ngOnInit(): void {
    if (this.productType.length) {
      this.imageLocationPrefix = `../../../../../assets/images/${this.productType}/`;
      this.defaultImage.imageURL = `${this.imageLocationPrefix}${this.productType}_group.JPG`;
      this.getProducts();
    }
  }

  selectDesign(product: IProduct) {
    this.selectedProduct = product;
    this.selectImageData();
  }

  nextImage() {
    this.selectedImageID++;
    this.selectedImage = this.selectedProduct?.images?.[this.selectedImageID] || this.defaultImage;
  }

  prevImage() {
    this.selectedImageID--;
    this.selectedImage = this.selectedProduct?.images?.[this.selectedImageID] || this.defaultImage;
  }

  //get all products per type
  getProducts() {
    this.loading = true;
    this.productList$ = this.productSrv.getProductDetailsByType(this.productType).pipe(
      map((item: IProduct[]) => this.formatProductData(item))
    );
  }

  formatProductData(data: IProduct[]) {
    this.selectedProduct = data[0];
    this.productTitle = data?.length > 1 ? `${this.productType}'s` : this.productType;
    this.selectImageData();
    this.loading = false;
    return data;
  }

  selectImageData() {
    this.selectedImageID = 0;
    if (this.selectedProduct?.images?.[0]) {
      this.selectedImage = this.selectedProduct?.images?.[0];
    } else {
      this.selectedImage = this.defaultImage;
    }
  }

  back() {
    this.router.navigate([`/products`]);
  }
}
