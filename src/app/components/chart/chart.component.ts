import { Component, OnInit } from '@angular/core';
import { CrudService } from "../../services/crud.service";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  
  currentCasesInSwedenHistory = [];
  chart;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.getCurrentCaseInSweden();
  }

  getCurrentCaseInSweden(): void {
    this.crudService.getHistoryData().subscribe(x => {
      x.forEach(y => {
        console.log(y.payload.doc.dm.proto.fields.currentCasesInSweden.stringValue);
        this.currentCasesInSwedenHistory.push(y.payload.doc.dm.proto.fields.currentCasesInSweden.stringValue);
      });
    });
  }

  // console.log(doc.payload.doc.dm.proto.fields.currentCasesInSweden.stringValue);

  chartConfiger() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: this.currentCasesInSwedenHistory,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
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
