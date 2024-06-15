import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule]
})
export class NavbarComponent {
  constructor(private router: Router, private productSrv: ProductService) {}

  menuTopics: string[] = ["Products"];
  selectedRoute: string = this.getCorrectRoute();
  searchText: string = "";

  btnClick(event: any) {
    this.selectedRoute = event;
    this.router.navigate([`/${event.toLowerCase()}`]);
  }

  getCorrectRoute() {
    return this.router.url?.substring(1);
  }

  search() {
    this.productSrv.search(this.searchText);
  }
}
