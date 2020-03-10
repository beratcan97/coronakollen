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

      const rawDataString = htmlObject.getElementsByTagName("p")[3].innerHTML;
      const rawDataStringArray = rawDataString.split(",");
      var dataNumberArray = rawDataStringArray[1].match(/\d/g);
      let finalNumber = "";
      dataNumberArray.forEach(number => {
        finalNumber = finalNumber + number;
      });

      this.wikiRawDATA = finalNumber.slice(0,3);
    });
  }
}
