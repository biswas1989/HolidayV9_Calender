import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { CalendarViewComponent } from './dashboard/calendar-view/calendar-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CalendarViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
