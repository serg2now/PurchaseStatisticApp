import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../interfaces/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private apiUrl = '/api/purchases';

  constructor(private httpClient: HttpClient) { }

  getPurchases(): Observable<Purchase[]> {
    return this.httpClient.get<Purchase[]>(this.apiUrl);
  }
}
