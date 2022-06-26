import { Component, Input, OnInit } from '@angular/core';
import { Purchase } from 'src/app/interfaces/purchase';

@Component({
  selector: 'purchase',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.css']
})
export class PurchaseItemComponent implements OnInit {
  @Input() purchase!: Purchase;

  constructor() { }

  ngOnInit(): void {
  }

}
