import { Component, OnInit } from '@angular/core';
import { BitcoinDataService } from '../../services/bitcoin-data.service'
import { CurrencyConverterService } from '../../services/currency-converter.service'

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  btcPriceInSEK;
  btcPriceInUSD;

  constructor(
    private bitcoinDataService: BitcoinDataService) { }

  ngOnInit() {
    this.getDATA();

    setInterval(() => {
      // this.getDATA();
    }, 10000)
  }

  getDATA(): void {
    this.bitcoinDataService.getBTCDataFromCoinBase('SEK')
    .subscribe(
      DATA => {
        console.log(DATA);
        // this.btcPriceInSEK = Math.round(DATA.data.amount);
      }
    );
  }
}
