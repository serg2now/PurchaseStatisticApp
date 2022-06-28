import { Component, OnInit } from '@angular/core';
import { PurchasesService } from './services/purchases.service';
import { WebSocketService } from './services/webSocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'purchase-statistic-app';

  constructor(private webSockertService: WebSocketService, private purchaseService: PurchasesService){
  }

  ngOnInit(): void {
    this.purchaseService.getNotificationSocketUrl().subscribe(url => this.webSockertService.connect(url));
  }
}
