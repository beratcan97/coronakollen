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
    });
  }
}
