import { Injectable } from '@angular/core';
import { catchError, Subject, EMPTY, switchAll, tap, map, Observable, throwError } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Purchase } from '../interfaces/purchase';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$!: WebSocketSubject<Purchase>;
  private messagesSubject$ = new Subject<Observable<Purchase>>();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => throwError(() => e)));

  constructor() { }

  public connect(url: string): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket(url);
      const notifications = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));

      this.messagesSubject$.next(notifications);
    }
  }
  
  private getNewWebSocket(url: string): WebSocketSubject<Purchase> {
    return webSocket(url);
  }
}
