import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {DataService} from 'services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: Array<ISensorData> = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.data.push(
      {
        date: new Date(2019, 1, 1, 3, 12, 0),
        temperature: 28,
        humidity: 30
      },
      {
        date: new Date(2019, 1, 1, 9, 12, 0),
        temperature: 29,
        humidity: 32
      },
      {
        date: new Date(2019, 1, 1, 18, 12, 0),
        temperature: 30,
        humidity: 35
      }
    )
  }
}

export interface ISensorData {
  date: Date;
  temperature: number;
  humidity: number;
}
