import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HolidayService } from '../services/holiday.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // assign selected city to selectedCity
  selectedCity: string = null;

  // use year to display year
  year;

  // add month names in monthInAlphabets Array
  monthInAlphabets: Array<any> = [ 'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December' ];

  // Use month index to get month in monthInAlphabets
  monthIndex = 0;

  // get cities and assign it to cities
  cities: Array<any>;

  constructor(public dialog: MatDialog, private holidayServiceObj: HolidayService, private route: Router) {

  }

  /**
   * Set the current month index to monthIndex and set current year to year
   * get cities
   */
  ngOnInit() {
    var date = new Date();
    this.year = date.getFullYear();
    this.monthIndex = date.getMonth()
    this.getCities();
  }

  /**
   *  To navigate month
   *  if "flag" is 0 which means that user click left arrow key <-
   *  if "flag" is 1 which means that user click right arrow key ->
   */
  navigationArrowMonth(flag) {
    
    if(flag == 0 && this.monthInAlphabets[this.monthIndex]=== 'January'){
      this.monthIndex = 12
      this.year--
    } else if(flag == 1 && this.monthInAlphabets[this.monthIndex]=== 'December'){
      this.monthIndex = -1
      this.year++
    }
    flag === 0 ? this.monthIndex-- : this.monthIndex++
  }

  /**
   *  To navigate year
   *  if "flag" is 0 which means that user onclick left arrow key <-
   *  if "flag" is 1 which means that user onclick right arrow key ->
   */
  navigationArrowYear(flag) {
    flag === 0 ? this.year-- : this.year++
  }

  /**
   * To disable navigation for month
   * Return true to disable
   * Return false to enable
   */
  monthNavigatorValidation() {
    if(this.monthIndex !== 11){
      return false;
    }else if(new Date().getMonth() === 11 && this.year === new Date().getFullYear()){
      return false;
    }else{
      return true;
    }
  }

  /**
   * To disable navigation for year
   * return true to disable
   * return false to enable
   */
  yearNavigatorValidation() {
    if(this.monthIndex !== 11 && this.year < new Date().getFullYear()){
      return false
    }else if(this.monthIndex !== 11){
        return true
    }else if(new Date().getMonth() === 11 && this.year === new Date().getFullYear()){
      return false;
    }else{
      return true;
    }

  }

  // Get cities list and assign the response value to cities
  getCities() {
    this.holidayServiceObj.getCities().subscribe(data =>{
      this.cities = data;
    })
  }


}
