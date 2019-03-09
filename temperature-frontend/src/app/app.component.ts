import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from './services/data.service';
import {
  MatDatepickerInputEvent,
  MatPaginator,
  MatTableDataSource
} from '@angular/material';
import {BUILD_META} from '../environments/build.meta';
import DataSnapshot = firebase.database.DataSnapshot;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dataInScope: Array<ISensorData> = [];
  dataComplete: Array<ISensorData> = [];
  latestDataSet: ISensorData;

  version: string = BUILD_META.version;
  buildDate: Date = new Date(BUILD_META.buildDate);

  // variables for data table
  displayedColumns: string[] = ['dateTime', 'temperature', 'humidity'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<ISensorData>();

  // variables for the toggle button
  color = 'primary';
  graphOnly = false;
  disabled = false;

  // variables for datePicker
  dateFilter = (d: Date): boolean => {
    // will be changed later in loadConfig() as we have to wait for data to be ready
    return false;
  };
  dateStart = new Date();
  dateEnd = new Date();

  // variables for spinner
  spinnerMode = 'indeterminate';
  spinnerColor = 'primary';

  // miscellaneous variables
  isMobile = false;
  isLoadingError = false;
  loadingError: Error = null;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.resetStartEndDates();

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent)) {
      this.isMobile = true;
    }
    this.loadConfig().then(() => {
      this.updateDataInScope();
      this.updateDateFilter();
      this.setDatePickers();
      this.setLatestDataSet();
    });
  }

  /**
   * 1) Resets data arrays
   * 2) Reloads data from server
   * 3) Applies filters
   * 4) Sets latest data set
   * Executed e.g. when hitting refresh button
   */
  refreshData(): void {
    this.resetDataArrays();
    this.loadConfig().then(() => {
      this.updateDataInScope();
      this.updateDateFilter();
      this.setLatestDataSet();
    });
  }

  /**
   * Set data arrays back to zero
   */
  private resetDataArrays(): void {
    this.dataComplete = [];
    this.dataInScope = [];
  }

  /**
   * 1) Loads the data from the file server
   * 2) Parses the data in the right format
   * 3) Sorts the data
   * Returns a promise which can trigger subsequent activities
   */
  loadConfig(): Promise<any> {
    let that = this;
    this.isLoadingError = false;
    this.loadingError = null;
    return new Promise(function (resolve, reject) {
      that.dataService.getDataOnce()
        .then((dataSnapshot: DataSnapshot | Array<ISensorData>) => {
          let data: Array<ISensorData>;
          // TODO: Make this nicer
          if (!(dataSnapshot instanceof Array)) {
            data = dataSnapshot.val();
          } else { // if mock is used
            data = dataSnapshot;
          }
          data.forEach((dataSet: ISensorData) => {
            // comes as   2019-01-13 14:34:02
            // for iOS: replace dash else it cannot be converted
            // see https://stackoverflow.com/questions/13363673/javascript-date-is-invalid-on-ios
            dataSet.date = new Date(dataSet.date.toString().replace(/-/g, '/'));
            dataSet.temperature = parseFloat(String(dataSet.temperature));
            dataSet.humidity = parseFloat(String(dataSet.humidity));
            that.dataComplete.push(dataSet)
          });
          that.dataComplete.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return b.date.valueOf() - a.date.valueOf();
          });
          that.dataComplete = that.dataComplete.reverse();
          resolve();
        }, error => {
          that.isLoadingError = true;
          that.loadingError = error;
          reject(error);
        });
    });
  }

  /**
   * Update datePicker filter so that only dates can be chosen where data sets are available
   */
  private updateDateFilter(): void {
    this.dateFilter = (d: Date): boolean => {
      return this.dataComplete.some((dataSet: ISensorData) => {
        let d2 = dataSet.date;
        return d.getFullYear() === d2.getFullYear() &&
          d.getMonth() === d2.getMonth() &&
          d.getDate() === d2.getDate()
      });
    };
  }

  /**
   * Assigns the subset of dataComplete which is in range of dateStart and dateEnd
   */
  updateDataInScope(): void {
    if (this.dateEnd == null || this.dateStart == null) {
      this.dataInScope = this.dataComplete;
    }
    //console.debug('Before update: ' + this.dataInScope.length);

    this.dataInScope = this.dataComplete.filter((dataSet: ISensorData) => {
      // FYI: currently we only check on day basis. No check on minute basis possible currently.
      if (dataSet.date.valueOf() >= this.dateStart.valueOf() && dataSet.date.valueOf() <= (this.dateEnd.valueOf())) {
        return dataSet;
      } else {
        //console.debug("Not in scope: " + dataSet.date)
      }
    });
    //console.debug('After update: ' + this.dataInScope.length);

    // Slicing needed to update children components
    this.dataInScope = this.dataInScope.slice();

    // Reassigning the dataSource data for the DataTable
    this.dataSource.data = this.dataInScope;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Sets dateStart and dateEnd to the date of the latest data set available
   */
  setDatePickers(): void {
    this.dateStart.setDate(
      this.dataComplete[this.dataComplete.length - 1].date.getDate());
    this.dateEnd.setDate(
      this.dataComplete[this.dataComplete.length - 1].date.getDate());
  }

  /**
   * Reset dateStart and dateEnd to 00:00:00 and 23:59:59 respectively
   */
  private resetStartEndDates(): void {
    this.dateStart.setHours(0, 0, 0);
    this.dateEnd.setHours(23, 59, 59);
  }

  /**
   * Set the latest available data set (for widget in UI)
   */
  setLatestDataSet(): void {
    this.latestDataSet = this.dataComplete[this.dataComplete.length - 1];
  }

  /**
   * Event handler for MatDatepicker
   * 1) Resets start and end dates
   * 2) Updates data in scope
   * @param type
   * @param event
   */
  onDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.resetStartEndDates();
    this.updateDataInScope();
  }
}

export interface ISensorData {
  date: Date;
  temperature: number;
  humidity: number;
}
