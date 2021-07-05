import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  // **************** Dashboard **************** //

  /**
   * Request using GET method and return Observable
   * Use the URL 'api/cities'
   */
  getCities(): Observable<any> {
    return this.http.get('api/cities');
  }


 // **************** Holiday View **************** //

  /**
   * Request using POST method and send JSON object eg: {city_name:'cityA',month:1, year: 2020}
   * Return Observable
   * Use the URL 'api/monthly'
   */
  getHolidays(city: string, monthIndex: number, year: number): Observable<any> {
    return this.http.post('api/monthly',{city_name: city, month: monthIndex+1, year});
  }

  

}
