import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productDetails: any = null;
  editProduct: FormGroup = new FormGroup({})
  constructor(  private formBuilder: FormBuilder,
                public productService: ProductService,
                public dialogRef: MatDialogRef<EditProductComponent>,
                @Inject(MAT_DIALOG_DATA) public product: any) { }

  ngOnInit(): void {
    if(this.product){
      this.productDetails = this.product.product;
    }
    this.editProduct = this.formBuilder.group({
      id: [this.productDetails?.id],
      title: [this.productDetails?.title, [Validators.required]],
      description: [this.productDetails?.description, [Validators.required]],
      price: [this.productDetails?.price,[Validators.required]],
      category: [this.productDetails?.category ? this.productDetails.category : 'cloths'],
      image: [this.productDetails?.image ? this.productDetails.image : ''],
      quantity: [this.productDetails?.quantity ? this.productDetails.quantity : '20'],
      rating: [this.productDetails?.rating ? this.productDetails.rating : {rate: 4, count: 120}]
  });
  }

  onSubmit(){
    this.dialogRef.close(this.editProduct.value);
  }

  onCancel(){
    this.dialogRef.close();
  }
  
}
