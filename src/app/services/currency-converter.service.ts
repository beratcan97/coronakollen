import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  public readonly exchangeDATA$: Observable<any> = this.getExchangeData();

  constructor(private http: HttpClient) { }

  getExchangeData(): Observable<any> {
    return this.http.get('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=SEK&apikey=UX0BHMTQOZ508A9W');
  }
}
