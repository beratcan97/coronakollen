import * as core from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@core.Injectable({
  providedIn: 'root'
})
export class BitcoinDataService {

  constructor(private http: HttpClient) { }

  // getBTCData(): Observable<any> {
  //   return this.http.get('https://api.coinbase.com/v2/prices/spot?currency=SEK');
  // }

  getBTCDataFromCoinBase(currency): Observable<any> {
    return this.http.get('https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Sweden');
  }
}
