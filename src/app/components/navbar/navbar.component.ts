import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
  }

  
  viewCart(): void {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '30rem'
    });
  }

  logout() {
    sessionStorage.setItem('userId', '');
    sessionStorage.setItem('userRole', '');
    this.router.navigate(['']);
  }

  isUser(){
    return sessionStorage.getItem('userRole') === 'user'
  }
}
