import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['title', 'price', 'action'];
  constructor(
    public productService: ProductService,
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public cart: any,
  ) {
  }

  ngOnInit(): void {
    this.productService.cart.subscribe(cart => {
      this.cart = cart
    });
  }

  getTotalCost(): number {
    let totalAmmount: any = 0;
    this.cart.forEach((product: any) => {
      totalAmmount = totalAmmount + (product.price * product.quantity);
    })
    return totalAmmount.toFixed(2);
  }

  removeFormCart(index: number) {
    this.productService.removeFromCart(index);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  quantityOperation(id: number,operation: string){
    this.productService.quantityOperation(id, operation);
  }
}
