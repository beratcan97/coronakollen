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
  dateDATA = new Date();

  constructor(
    private bitcoinDataService: BitcoinDataService,
    private crudService: CrudService
  ) { }

  ngOnInit() {
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

      let finalNumber: number;
      for (let i = 0; i < 10; i++) {
        const tmpRawDataString = htmlObject.getElementsByTagName("p")[i].innerHTML;
        const rawDataString = tmpRawDataString.substring(
          tmpRawDataString.lastIndexOf("2020, there are ") + 1,
          tmpRawDataString.lastIndexOf("confirmed cases")
        );
        if (rawDataString.length > 3) {
          finalNumber = parseInt(rawDataString.substring(42));
        }
      }

      if (9 < finalNumber && finalNumber > this.currentCasesInSweden.currentCasesInSweden) {
        const currentCasesInSwedenToUpdate = {
        currentCasesInSweden: finalNumber,
        deaths: this.currentCasesInSweden.deaths,
        recovered: this.currentCasesInSweden.recovered,
        severeCases: this.currentCasesInSweden.severeCases,
        displayDate: this.dateDATA.getFullYear() + '-' + (this.dateDATA.getMonth() + 1) + '-' + this.dateDATA.getDate(),
        date: this.dateDATA,
        updatedBy: 'user'
      };

        // Updates DB
        this.crudService.updateCurrentCaseInSweden(currentCasesInSwedenToUpdate);
      }
    });
  }
}
