import { Component, OnInit } from "@angular/core";
import { BitcoinDataService } from "../../services/bitcoin-data.service";
import { CrudService } from "../../services/crud.service";

@Component({
  selector: "app-stats-container",
  templateUrl: "./stats-container.component.html",
  styleUrls: ["./stats-container.component.css"]
})
export class StatsContainerComponent implements OnInit {
  isLoaded = false;
  currentCasesInSweden;

  constructor(
    private bitcoinDataService: BitcoinDataService,
    private crudService: CrudService
  ) {}

  ngOnInit() {
    // this.crudService.updateCurrentCaseInSweden(4);
    this.getCurrentCaseInSweden();
   
  }

  getCurrentCaseInSweden(): void {
    this.crudService.getCurrentCaseInSweden().subscribe(DATA => {
      this.currentCasesInSweden = DATA.payload.data();
      this.getDATAFromWikipediaAndUpdateDB();
    });
  }

  getDATAFromWikipediaAndUpdateDB(): void {
    this.bitcoinDataService.getCoronaDataFromWikipediApi().subscribe(DATA => {
      let s = DATA.query.pages[63239190].extract;
      let htmlObject = document.createElement("div");
      htmlObject.innerHTML = s;

      const tmpRawDataString = htmlObject.getElementsByTagName("p")[4].innerHTML;

      const rawDataString = tmpRawDataString.substring(
        tmpRawDataString.lastIndexOf("2020, there are ") + 1,
        tmpRawDataString.lastIndexOf("confirmed cases")
      );

      const finalNumber = rawDataString.substring(42);

      if (this.currentCasesInSweden.currentCasesInSweden < parseInt(finalNumber, 10)) {
        // Updates DB
        this.crudService.updateCurrentCaseInSweden(parseInt(finalNumber, 10));
      }
    });
  }
}
