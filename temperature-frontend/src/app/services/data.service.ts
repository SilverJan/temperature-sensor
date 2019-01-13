import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    let body = { "username": username, "password": password };
    return this.http.post(environment.backendUrl + '/token', body, options)
      .map(DataService.extractData)
      .catch(DataService.handleError);
  }

  getAllElements(): Observable<IElement[]> {
    if (environment.mock) {
      return Observable.create((observer) => {
        let mockData: IElement[] = []
        observer.next(mockData);
      });
    } else {
      let options = {
        headers: new HttpHeaders().set('Authorization',
          `Bearer ${sessionStorage.getItem('session')}`)
      };
      return this.http.get(environment.backendUrl + '/element', options)
        .map(DataService.extractData)
        .catch(DataService.handleError);
    }
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
