import { Component, OnInit } from '@angular/core';
import { BitcoinDataService } from "../../services/bitcoin-data.service";

@Component({
  selector: 'app-stats-container',
  templateUrl: './stats-container.component.html',
  styleUrls: ['./stats-container.component.css']
})
export class StatsContainerComponent implements OnInit {
  isLoaded = false;
  wikiRawDATA;

  constructor(private bitcoinDataService: BitcoinDataService) {}

  ngOnInit() {
    this.getDATA();
  }

  getDATA(): void {
    this.bitcoinDataService.getCoronaDataFromWikipediApi().subscribe(DATA => {

      let s = DATA.query.pages[63239190].extract;
      let htmlObject = document.createElement("div");
      htmlObject.innerHTML = s;
      const tmpRawDataString = htmlObject.getElementsByTagName("p")[4].innerHTML;

      const rawDataString = tmpRawDataString.substring(
        tmpRawDataString.lastIndexOf("2020, there are ") + 1, 
        tmpRawDataString.lastIndexOf("confirmed cases")
      );

      const finalNumber = rawDataString.substring(15);
      this.wikiRawDATA = finalNumber;
    });
  }
}