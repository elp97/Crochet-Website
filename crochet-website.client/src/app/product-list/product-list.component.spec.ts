import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { IProductTypes } from '../interfaces/IProductTypes';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let testProductData: IProductTypes = {
    id: "1",
    type: "test",
    count: 1,
    productImage: "",
    background: "green"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no product messaged is showed', () => {
    const noProductsMsg = fixture.debugElement.query(
      By.css('[data-testid="no-products-msg"')
    );
    expect(noProductsMsg).toBeTruthy();
  });

  it('message not shown when data is present', () => {
    const testData: IProductTypes[] = [testProductData];
    component.productsList$ = of(testData);

    fixture.detectChanges();

    const noProductsMsg = fixture.debugElement.query(
      By.css('[data-testid="no-products-msg"')
    );
    expect(noProductsMsg).toBeFalsy();
  });

});
