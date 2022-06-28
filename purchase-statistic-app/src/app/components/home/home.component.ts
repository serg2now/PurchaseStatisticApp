import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/interfaces/purchase';
import { PurchasesService } from 'src/app/services/purchases.service';
import { WebSocketService } from 'src/app/services/webSocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  purchases!: Purchase[];

  isLoading = true;

  constructor(private service: PurchasesService, private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.service.getPurchases().subscribe({
      next: (response) => {
        this.purchases = response;
        this.isLoading = false;
      }, 
      error: () => {
        this.isLoading = false;
      }
    });

    this.webSocketService.messages$.subscribe((eventData: Purchase) => {
      const purchase = { ...eventData, isNew: true };

      this.purchases.push(purchase);
    });
  }

}
