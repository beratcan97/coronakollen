import { Component, OnInit } from '@angular/core';
import { CrudService } from "../../services/crud.service";
import { Chart } from 'chart.js';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  dataAray = [];
  chart;

  //Data
  cassesInSwedenHistory = [];
  datesHistory = [];
  chartDots = [];

  constructor(private crudService: CrudService,private angularFirestore: AngularFirestore) { }

  ngOnInit() {
    this.getCurrentCaseInSweden();
  }

  getCurrentCaseInSweden(): void {
    let tmpLatestDateStates;
    this.angularFirestore.collection('stats').get()
    .toPromise().then(snapshot => {
        snapshot.docs.map(doc => {
          this.dataAray.push(doc.data());
        });

        this.dataAray.forEach(day => {
          if (!tmpLatestDateStates) {
            tmpLatestDateStates = day;
          }
          if (day.date > tmpLatestDateStates.date) {
            tmpLatestDateStates = day;
          }
        });

        window.sessionStorage.setItem('tmpLatestDateStates', JSON.stringify(tmpLatestDateStates));

        this.dataAray.forEach(day => {
          this.cassesInSwedenHistory.push(day.currentCasesInSweden);
          this.datesHistory.push(day.date);

          this.chartDots.push('rgba(255, 99, 132, 1)');
        });

        this.cassesInSwedenHistory.sort();
        this.datesHistory.sort();

        console.log(this.cassesInSwedenHistory);
        console.log(this.datesHistory);


        this.chartConfiger();
      }).catch(function(error){
        console.log("got an error",error);        
    })
  }

  chartConfiger() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.datesHistory,
        datasets: [{
            label: 'Antal smittade',
            data: this.cassesInSwedenHistory,
            backgroundColor: [],
            borderColor: this.chartDots,
            borderWidth: 3
        }]
    },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
}

