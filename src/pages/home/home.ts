import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { ListPage } from '../list/list';
import { FavsPage } from '../favs/favs';
import { PhonesPage } from '../phones/phones';
import { AboutPage } from '../about/about';
import { EventDetailPage } from '../event-detail/event-detail';
import { ChatPage } from '../chat/chat';
import { CalendarviewPage } from '../calendarview/calendarview';

import { EventsService } from '../../services/events';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  programPage = ListPage;
  favsPage = FavsPage;
  phonesPage = PhonesPage;
  aboutPage = AboutPage;
  eventPage = EventDetailPage;
  chatPage = ChatPage;
  calendarPage = CalendarviewPage;

  rightNowEvents: any = [];
  nextEvents: any = [];

  loading: any;

  

  constructor(public navCtrl: NavController, public events: EventsService, public loadingController: LoadingController) {
    //this.rightNowEvents = events.allEvents
    events.allEvents.forEach(element => {

      // Organización de eventos actuales
      var hours = Math.abs(element.start.getTime() - new Date().getTime()) / 3600000;
      if(element.start > new Date() && hours <= 5){
        this.rightNowEvents.push(element);
      }
      this.rightNowEvents = this.rightNowEvents.slice(0, 5);

      // Organización de próximos eventos
      if(element.start > new Date() && hours > 5){
        this.nextEvents.push(element);
      }
      this.nextEvents = this.nextEvents.slice(0, 5);
    });
    
  }

  ionViewWillEnter(){
    console.log("Will enter");
    this.loading = this.loadingController.create({ content: "Cargando..." });
    this.loading.present();
  }

  ionViewDidEnter(){
    this.loading.dismiss();
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