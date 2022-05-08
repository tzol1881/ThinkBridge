import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>) { }

  ngOnInit(): void {
  }

  onClose(confirm:boolean){
    this.dialogRef.close(confirm)
  }
}
