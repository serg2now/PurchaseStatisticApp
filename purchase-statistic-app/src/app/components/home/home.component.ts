import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/interfaces/purchase';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  purchases!: Purchase[];

  constructor(private service: PurchasesService) { }

  ngOnInit(): void {
    this.service.getPurchases().subscribe((response) => {
      this.purchases = response;
    });
  }

}
