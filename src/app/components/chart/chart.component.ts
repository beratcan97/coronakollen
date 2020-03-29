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

  constructor(private crudService: CrudService,private angularFirestore: AngularFirestore) { }

  ngOnInit() {
    this.getCurrentCaseInSweden();
  }

  getCurrentCaseInSweden(): void {
    this.angularFirestore.collection('stats').get()
    .toPromise().then(snapshot => {
        snapshot.docs.map(doc => {
          this.dataAray.push(doc.data());
        });

        this.dataAray.forEach(day => {
          this.cassesInSwedenHistory.push(day.currentCasesInSweden);
          this.datesHistory.push(day.date);
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
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
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

