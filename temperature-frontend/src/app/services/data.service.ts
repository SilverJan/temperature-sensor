import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient, private db: AngularFireDatabase ) {
  }

  baseUri = environment.baseUri;
  configUrl = `http://${this.baseUri}/logs/temps.json`;
  mock = environment.mock;

  getData():Observable<any> {
    if (this.mock) {
      return this.http.get(`http://${this.baseUri}/assets/mockData_big.json`);
    }
    return this.db.list('data').valueChanges();
    //return this.http.get(this.configUrl);
  }

  private static extractData(res: Response) {
    if (res['data']) {
      return res['data'];
    }
    return res || {};
  }

  private static handleError(error: Response | any): Observable<Response> {
    // let errMsg: string;
    // if (error instanceof Response) {
    //   const body = error.json() || '';
    //   const err = body.error || JSON.stringify(body);
    //   errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    // } else {
    //   errMsg = error.message ? error.message : error.toString();
    // }
    console.error(error);
    return Observable.throw(error);
  }
}
