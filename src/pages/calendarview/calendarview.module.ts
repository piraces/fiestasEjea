import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarviewPage } from './calendarview';
import { CalendarModule } from '../../lock/ionic3-calendar-en';

@NgModule({
  declarations: [
    CalendarviewPage,
  ],
  imports: [
    CalendarModule,
    IonicPageModule.forChild(CalendarviewPage),
  ],
})
export class CalendarviewPageModule {}
