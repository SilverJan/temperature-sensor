import { Component } from '@angular/core';
import {DataService} from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: Array<ISensorData> = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.data.push(
    //   {
    //     date: new Date(2019, 1, 1, 3, 12, 0),
    //     temperature: 28,
    //     humidity: 30
    //   },
    //   {
    //     date: new Date(2019, 1, 1, 9, 12, 0),
    //     temperature: 29,
    //     humidity: 32
    //   },
    //   {
    //     date: new Date(2019, 1, 1, 18, 12, 0),
    //     temperature: 30,
    //     humidity: 35
    //   },
    //   {
    //     date: new Date(2019, 1, 1, 21, 12, 0),
    //     temperature: 25,
    //     humidity: 25
    //   }
    // );

    this.loadConfig();
  }

  loadConfig() {
    this.dataService.getTemperature()
      .subscribe((data: Array<ISensorData>) => {
        data.forEach((dataSet:ISensorData) => {
          // comes as   2019-01-13 14:34:02
          dataSet.date = new Date(dataSet.date);
          dataSet.temperature = parseFloat(String(dataSet.temperature));
          dataSet.humidity = parseFloat(String(dataSet.humidity));
          this.data.push(dataSet)
        });
        this.data.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          // TODO: Investigate further
          return new Date(b.date) - new Date(a.date);
        });
        this.data = this.data.reverse();
        this.data = this.data.slice();
      });
  }
}

export interface ISensorData {
  date: Date;
  temperature: number;
  humidity: number;
}
