import {Component} from '@angular/core';
import {DataService} from './services/data.service';
import {MatDatepickerInputEvent} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataInScope: Array<ISensorData> = [];
  dataComplete: Array<ISensorData> = [];


  // variables for the toggle button
  color = 'primary';
  graphOnly = false;
  disabled = false;
  dateStart = new Date();
  dateEnd = new Date();

  // variables for spinner
  spinnerMode = 'indeterminate';
  spinnerColor = 'primary';

  constructor(private dataService: DataService) {
    this.dateStart.setDate(this.dateStart.getDate() - 14);
  }

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
        data.forEach((dataSet: ISensorData) => {
          // comes as   2019-01-13 14:34:02
          dataSet.date = new Date(dataSet.date);
          dataSet.temperature = parseFloat(String(dataSet.temperature));
          dataSet.humidity = parseFloat(String(dataSet.humidity));
          this.dataComplete.push(dataSet)
        });
        this.dataComplete.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return b.date.valueOf() - a.date.valueOf();
        });
        this.dataComplete = this.dataComplete.reverse();
        this.updateDataInScope()
      });
  }

  updateDataInScope() {
    if (this.dateEnd == null || this.dateStart == null) {
      this.dataInScope = this.dataComplete;
    }
    console.info('Before update: ' + this.dataInScope.length);

    let oneDayInMs = 86400000
    this.dataInScope = this.dataComplete.filter((dataSet: ISensorData) => {
      if (dataSet.date.valueOf() >= this.dateStart.valueOf() && dataSet.date.valueOf() <= (this.dateEnd.valueOf() + oneDayInMs)) {
        return dataSet;
      } else {
        console.debug("Not in scope: " + dataSet.date)
      }
    });
    console.info('After update: ' + this.dataInScope.length);

    // Slicing needed to update children components
    this.dataInScope = this.dataInScope.slice();
  }

  onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.updateDataInScope();
  }
}

export interface ISensorData {
  date: Date;
  temperature: number;
  humidity: number;
}
