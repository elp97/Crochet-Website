import { Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductItemComponent } from "./product-item/product-item.component";

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'product', component: ProductItemComponent },
];
