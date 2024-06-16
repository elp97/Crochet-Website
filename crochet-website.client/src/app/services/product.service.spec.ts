import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { environment } from '../../environments/environment';
import { IProductTypes } from '../interfaces/IProductTypes';
import { IProduct } from '../interfaces/IProduct';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const inputtedType = "testA";
const productTypesExpectedURL = `${environment.apiUrl}/api/products/getTypes`;
const byTypeExpectedURL = `${environment.apiUrl}/api/products/getProductsByType/${inputtedType}`;

const productTypeA: IProductTypes = {
  id: "1",
  type: "testA",
  count: 1,
  productImage: "testA.png",
  background: "testA"
}

const productTypes: IProductTypes[] = [productTypeA];

const productA: IProduct = {
  productID: 0,
  name: 'test',
  price: 0,
  description_Small: ''
}
const productsPerType: IProduct[] = [productA];

describe('ProductService', () => {
  let service: ProductService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('product types should be returned', () => {
    let actualData = [] as any || undefined;
    service.getProductTypes().subscribe((fetchedData) => {
      actualData = fetchedData;
    });
    const request = controller.expectOne(productTypesExpectedURL);
    request.flush(productTypes);
    expect(actualData).toEqual(productTypes);
  });

  it('products for inputted type should be returned', () => {
    let actualData = [] as any || undefined;
    service.getProductsPerType(inputtedType).subscribe((fetchedData) => {
      actualData = fetchedData;
    });
    const request = controller.expectOne(byTypeExpectedURL);
    request.flush(productsPerType);
    expect(actualData).toEqual(productsPerType);
  });
});
