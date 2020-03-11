import { Component, OnInit } from "@angular/core";
import { BitcoinDataService } from "../../services/bitcoin-data.service";
import { CurrencyConverterService } from "../../services/currency-converter.service";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.css"]
})
export class StartComponent implements OnInit {
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
        tmpRawDataString.lastIndexOf("there are") + 1, 
        tmpRawDataString.lastIndexOf("confirmed cases in Sweden")
      );
      
      const finalNumber = rawDataString.substring(9);
      this.wikiRawDATA = finalNumber;
    });
  }
}
