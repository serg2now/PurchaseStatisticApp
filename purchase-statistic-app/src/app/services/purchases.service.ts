import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../interfaces/purchase';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getPurchases(): Observable<Purchase[]> {
    return this.httpClient.get<Purchase[]>(`${this.apiUrl}/purchases`);
  }

  getNotificationSocketUrl(): Observable<string> {
    return this.httpClient.get<any>(`${this.apiUrl}/negotiate`).pipe(map((data) => data.url));
  }
}
