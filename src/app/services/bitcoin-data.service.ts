import * as core from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@core.Injectable({
  providedIn: 'root'
})
export class BitcoinDataService {

  constructor(private http: HttpClient) { }

  getCoronaDataFromWikipediApi(): Observable<any> {
    return this.http.get('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&pageids=63239190&exlimit=2&origin=*');
  }

  getCoronaDataFromScrapingWikipedi(): Observable<any> {
    return this.http.get('');
  }
}
