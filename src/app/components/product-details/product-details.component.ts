import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productDetails: any = {};
  ratingArr: number[] = [];
  starCount: number = 5;
  rating: number = 0;
  userRole: string = '';
  constructor(
    public productService: ProductService,
    public dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public product: any
  ) {
  }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('userRole') || 'user'
    this.productDetails = this.product.product
    this.rating = this.productDetails.rating.rate;
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  getRatingToolTipText() {
    return `Rating: ${this.productDetails.rating.rate} / Reviews: ${this.productDetails.rating.count}`
  }

  isUser(){
    return this.userRole === 'user'
  }
}
