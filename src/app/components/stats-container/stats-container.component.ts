import { Component, OnInit } from "@angular/core";
import { BitcoinDataService } from "../../services/bitcoin-data.service";
import { CrudService } from "../../services/crud.service";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: "app-stats-container",
  templateUrl: "./stats-container.component.html",
  styleUrls: ["./stats-container.component.css"]
})
export class StatsContainerComponent implements OnInit {
  isLoaded = false;
  currentCasesInSweden;
  dateDATA = new Date();
  latestDateStates;

  constructor(
    private bitcoinDataService: BitcoinDataService,
    private crudService: CrudService, 
    private angularFirestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.getCurrentCaseInSweden();
    this.getYesterdayStatus();
  }

  getCurrentCaseInSweden(): void {
    this.crudService.getCurrentCaseInSweden().subscribe(DATA => {
      this.currentCasesInSweden = DATA.payload.data();
    });
  }

  getYesterdayStatus(): void {
    this.latestDateStates = JSON.parse(window.sessionStorage.getItem('tmpLatestDateStates'));
  }
}
