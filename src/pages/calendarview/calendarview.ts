import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsService } from '../../services/events';
import { EventDetailPage } from '../event-detail/event-detail';
import moment from 'moment';
/**
 * Generated class for the CalendarviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendarview',
  templateUrl: 'calendarview.html',
})
export class CalendarviewPage {
  items: any = [];
  currentEvents: any = [];
  eventPage = EventDetailPage;
  dateString: string = "...";

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: EventsService) {
    this.items = [];
    let date = new Date();
    let currentDate = new Date();
    this.dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    events.allEvents.forEach(element => {
      // Get today events
      if(element.start.toDateString() == new Date().toDateString() && element.start.getHours() >=5){
        this.items.push(element);
      } else if(this.getTomorrow(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == element.start.getDate() 
      && element.start.getHours() <=5 && element.start.getMonth() == this.getMonth(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) 
      && element.start.getFullYear() == this.getYear(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear())){
        this.items.push(element);
      }
      // Set currentEvents
      this.currentEvents.push({
        year: element.start.getFullYear(),
        month: element.start.getMonth(),
        date: element.start.getDate()
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarviewPage');
  }

  onDaySelect(event){
    this.dateString = event.date + '/' + (event.month + 1) + '/' + event.year;
    this.items = [];
    this.events.allEvents.forEach(element => {
      // Get today events
      if(((event.date == element.start.getDate() && element.start.getHours() >=5 && element.start.getMonth() == event.month && element.start.getFullYear() == event.year) || 
      (this.getTomorrow(event.date, event.month, event.year) == element.start.getDate() && element.start.getHours() <=5 
      && element.start.getMonth() == this.getMonth(event.date, event.month, event.year)
      && element.start.getFullYear() == this.getYear(event.date, event.month, event.year))) ){
        this.items.push(element);
      }
    });
  }

  getTomorrow(date, month, year){
    var aux = moment({ year :year, month :month, day :date, hour :0, minute :0, second :0, millisecond :0});
    return aux.add('days', 1).date();
  }

  getMonth(date, month, year){
    var aux = moment({ year :year, month :month, day :date, hour :0, minute :0, second :0, millisecond :0});
    return aux.add('days', 1).month();
  }

  getYear(date, month, year){
    var aux = moment({ year :year, month :month, day :date, hour :0, minute :0, second :0, millisecond :0});
    return aux.add('days', 1).year();
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  pushPage(params) {
    this.navCtrl.push(this.eventPage, params).then(response => {
        console.log(response);
    }).catch(e => {
        console.log(e);
    });
  }

}
