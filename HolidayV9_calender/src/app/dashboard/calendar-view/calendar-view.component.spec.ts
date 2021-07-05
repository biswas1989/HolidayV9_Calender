import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewComponent } from './calendar-view.component';
import { TestingModModule } from 'src/app/testing-mod/testing-mod.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { HolidayService } from 'src/app/services/holiday.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CalendarViewComponent', () => {
  let component: CalendarViewComponent;
  let fixture: ComponentFixture<CalendarViewComponent>;
  let servArr = ['getCities','getHolidays'];

let holidayServiceObj = jasmine.createSpyObj('HolidayService', servArr);
holidayServiceObj.getCities(of([]));  

holidayServiceObj.getHolidays(of([]));  
const weekHeader = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const testObj = new TestingModModule();

beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewComponent ],
      imports: [
        TestingModModule,
        RouterTestingModule,
        MaterialModule
      ],
      providers: [
        { provide: HolidayService, useValue: holidayServiceObj },
      ]
    })
    .compileComponents();
  }));

 
  beforeEach(() => {
    const setDate = new Date('2020/02/14');
    jasmine.clock().mockDate(setDate);
    fixture = TestBed.createComponent(CalendarViewComponent);
    component = fixture.componentInstance;
    component.year = 2020;
    component.monthIndex = 1;
    fixture.detectChanges();
    holidayServiceObj.getHolidays.calls.reset();
  });
  
  describe('TS file',()=>{
  
    it('Test1 monthGenerator should generate Objects', () => {
      holidayServiceObj.getHolidays.and.returnValue(of([]));
      component.year = 2020;
      component.monthIndex = 1;
      component.monthGenerator();
      expect(component.dateObj).toEqual(testObj.convertModel(1));
    });

    it('Test2 monthGenerator should generate Objects', () => {
      holidayServiceObj.getHolidays.and.returnValue(of([]));
      component.year = 2019;
      component.monthIndex = 11;
      component.monthGenerator();
      expect(component.dateObj).toEqual(testObj.convertModel(2));
    });

    it('Test3 monthGenerator should generate Objects', () => {
      holidayServiceObj.getHolidays.and.returnValue(of([]));
      component.year = 2020;
      component.monthIndex = 2;
      component.monthGenerator();
      expect(component.dateObj).toEqual(testObj.convertModel(3));
    });

    it('monthGenerator should call holidayInitializer after generating objects', () => {
      holidayServiceObj.getHolidays.and.returnValue(of([]));
      component.year = 2020;
      component.monthIndex = 2;
      let spy = spyOn(component, 'holidayInitializer');
      component.monthGenerator();
      expect(spy).toHaveBeenCalled();
    });

    it('holidayInitializer should use getHolidays() in HolidayService to get holiday list', () => {
      holidayServiceObj.getHolidays.and.returnValue(of(testObj.resOb1));
      component.city = 'ccc';
      component.monthIndex = 2;
      component.year = 2020;
      component.holidayInitializer();
      expect(holidayServiceObj.getHolidays).toHaveBeenCalledWith('ccc', 2, 2020);
    });

    it('Test1 getHolidays() => response data should be converted and intialized to responseDateObjs', async () => {
      holidayServiceObj.getHolidays.and.returnValue(of(testObj.resOb1));
      component.city = 'ccc';
      component.monthIndex = 2;
      component.year = 2020;
      component.holidayInitializer();
      await holidayServiceObj.getHolidays(component.city, component.monthIndex, component.year).subscribe(res => {
      });
      testObj.resOb1.forEach(element => {
        expect(component.responseDateObjs.get(element.date)).toEqual(element);
      });
    });

    it('Test2 getHolidays() => response data should be converted and intialized to responseDateObjs', (async () => {
      holidayServiceObj.getHolidays.and.returnValue(of(testObj.resOb2));
      component.city = 'ccc';
      component.monthIndex = 12;
      component.year = 2019;
      component.holidayInitializer();
      await holidayServiceObj.getHolidays(component.city, component.monthIndex, component.year).subscribe(res => {
        testObj.resOb2.forEach(element => {
          expect(component.responseDateObjs.get(element.date)).toEqual(element);
        });
      });
    }));

  })

  describe('HTML file', () => {

    it('calendar-header should contain header', () => {
      const calendarHeader = fixture.debugElement.query(By.css('.calendar-header'));
      const nativeWeek = calendarHeader.nativeElement.querySelectorAll('.week');
      expect(nativeWeek.length).toBe(7);
      let i = 0;
      for (let element of weekHeader) {
        expect(nativeWeek[i++].textContent.trim()).toBe(element);
      }
    });

    it('calendar-header should contain css class', () => {
      const calendarHeader = fixture.debugElement.query(By.css('.calendar-header'));
      let nativeWeek = calendarHeader.nativeElement.querySelectorAll('.week.mat-h3');
      expect(nativeWeek.length).toBe(7);
      let i = 0;
      for (let element of weekHeader) {
        expect(nativeWeek[i++].textContent.trim()).toBe(element);
      }
    });

    it('calendar-body should contain 6 rows', () => {
      holidayServiceObj.getHolidays.and.returnValue(of(testObj.resOb1));

      component.monthGenerator();
      fixture.detectChanges();
      const calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
      const nativeRow = calendarBody.nativeElement.querySelectorAll('.tr-row');
      expect(nativeRow.length).toBe(6);
    });

    it('calendar-body should contain 42 .td-month', () => {
      holidayServiceObj.getHolidays.and.returnValue(of(testObj.resOb1));
      component.monthGenerator();
      fixture.detectChanges();
      const calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
      const nativeRow = calendarBody.nativeElement.querySelectorAll('.td-month');
      expect(nativeRow.length).toBe(42);
    });

    it('Testing number of .tdEnabled css class', () => {
      holidayServiceObj.getHolidays.and.returnValue(of([]));
      for (let monthCount = 1; monthCount < 13; monthCount++) {
        const setDate = new Date(`2020/${monthCount}/14`);
        jasmine.clock().mockDate(setDate);
        component.monthIndex = monthCount - 1;
        component.year = 2020;
        component.ngOnInit();
        component.monthGenerator();
        fixture.detectChanges();
        let calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
        let tdEnabled = calendarBody.nativeElement.querySelectorAll('.tdEnabled');
        expect(tdEnabled.length).toBe(new Date(2020, monthCount, 0).getDate());
      }
    });

    it('Testing number of .tdDisabled css class', () => {
      holidayServiceObj.getHolidays.and.returnValue(of([]));
      for (let monthCount = 1; monthCount < 13; monthCount++) {
        const setDate = new Date(`2020/${monthCount}/14`);
        jasmine.clock().mockDate(setDate);
        component.monthIndex = monthCount - 1;
        component.year = 2020;
        component.ngOnInit();
        component.monthGenerator();
        fixture.detectChanges();
        let calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
        let tdEnabled = calendarBody.nativeElement.querySelectorAll('.tdDisabled');
        expect(tdEnabled.length).toBe(42 - (new Date(2020, monthCount, 0).getDate()));
      }
    });

  
    it('Display date', () => {
      for (let mockObjs of testObj.displayDate) {
        holidayServiceObj.getHolidays.and.returnValue(of([]));
        component.monthIndex = mockObjs.month - 1;
        component.year = mockObjs.year;
        component.monthGenerator();
        fixture.detectChanges();
        let calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
        let tdMonth = calendarBody.queryAll(By.css('.td-month'));
        for (let index = 0; index < mockObjs.endLoop1; index++) {
          let matH1Val = tdMonth[index].nativeElement.querySelector('.mat-h1');
          let resultNum = (mockObjs.beginDate + index) < 10 ? 0 + (mockObjs.beginDate + index).toString() :
            (mockObjs.beginDate + index).toString();
          expect(matH1Val.textContent.trim()).toBe(resultNum);
        }

        for (let index = mockObjs.endLoop1; index < mockObjs.endLoop2; index++) {
          let matH1Val = tdMonth[index].nativeElement.querySelector('.mat-h1');
          let resultNum = (index + 1 - mockObjs.endLoop1) < 10 ? 0 + (index + 1 - mockObjs.endLoop1).toString() :
            (index + 1 - mockObjs.endLoop1).toString();
          expect(matH1Val.textContent.trim()).toBe(resultNum);
        }

        for (let index = mockObjs.endLoop2, supportIndex = 1; index < 42; index++ , supportIndex++) {
          let matH1Val = tdMonth[index].nativeElement.querySelector('.mat-h1');
          let resultNum = (supportIndex) < 10 ? 0 + (supportIndex).toString() :
            (supportIndex).toString();
          expect(matH1Val.textContent.trim()).toBe(resultNum);
        }
      }
    });


    it('Display Holiday names in calendar', () => {
      for (let mockObjs of testObj.displayDate) {
        holidayServiceObj.getHolidays.and.returnValue(of(mockObjs.resObj));
        const setDate = new Date(`${mockObjs.year}/${mockObjs.month}/12`);
        jasmine.clock().mockDate(setDate);
        component.monthIndex = mockObjs.month - 1;
        component.year = mockObjs.year;
        component.monthGenerator();
        fixture.detectChanges();
        let calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
        let tdEnabled = calendarBody.queryAll(By.css('.tdEnabled'));
        let supportIndex = 0;
        for (let resData of mockObjs.resObj) {
          let index = parseInt(resData.date.split('/')[0]);
          let holdaiayName = tdEnabled[index - 1].nativeElement.querySelector('.mat-h3');
          expect(holdaiayName.textContent.trim()).toBe(mockObjs.resObj[supportIndex++].holidayName);
        }
      }
    });

  });
});
