import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { ProductDetailsComponent } from 'src/app/components/product-details/product-details.component';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { EditProductComponent } from 'src/app/components/edit-product/edit-product/edit-product.component';
import { DeleteConfirmComponent } from 'src/app/components/delete-confirm/delete-confirm/delete-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'hardskills-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  userRole: string = ''
  displayedColumns: string[] = ['title', 'price', 'rating', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  dataSource = new MatTableDataSource();

  constructor(private productService: ProductService,
              public dialog: MatDialog,
              public router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('userRole') || 'user';
    this.productService.getProductList()
      .then(res => res.json())
      .then(json => {
        this.products = json;
        this.products.forEach(product => product.quantity = 1)
        this.dataSource.data = [...this.products]
      })
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product);
  }

  viewProduct(product: Product): void {
    this.dialog.open(ProductDetailsComponent, {
      width: '50rem',
      data: { product: product },
    });
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '50rem',
      data: { product: product },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let products = [...this.products];
        let productIndex = products.findIndex(product => product.id === result.id);
        products[productIndex] = result;
        this.products = products;
        this.dataSource.data = [...this.products];
        this.snackBar.open('Successfully updated product','X')
      }
  });
  }

  addProduct(): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '50rem',
      data: { product: null },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let products = [...this.products];
        products.unshift(result);
        this.products = products;
        this.dataSource.data = [...this.products];
        this.snackBar.open('Successfully added product','X')
      }
  });
  }

  deleteProduct(productId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '25rem',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let products = [...this.products];
        let productIndex = products.findIndex(product => product.id === productId);
        products.splice(productIndex, 1);
        this.products = products;
        this.dataSource.data = [...this.products];
        this.snackBar.open('Successfully deleted product','X')
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator ?? null;
    this.dataSource.sort = this.sort ?? null;
  }

  isUser(){
    return this.userRole === 'user'
  }
}
