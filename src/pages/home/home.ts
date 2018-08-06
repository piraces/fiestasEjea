import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AdMobPro } from '@ionic-native/admob-pro';
import { ListPage } from '../list/list';
import { FavsPage } from '../favs/favs';
import { PhonesPage } from '../phones/phones';
import { AboutPage } from '../about/about';
import { EventDetailPage } from '../event-detail/event-detail';

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

  rightNowEvents: any = [];
  nextEvents: any = [];

  

  constructor(public navCtrl: NavController, public events: EventsService, private admob: AdMobPro, private platform: Platform) {
    //this.rightNowEvents = events.allEvents
    events.allEvents.forEach(element => {

      // Organización de eventos actuales
      var hours = Math.abs(element.start.getTime() - new Date().getTime()) / 3600000;
      if(hours <= 5){
        this.rightNowEvents.push(element);
      }
      this.rightNowEvents = this.rightNowEvents.slice(0, 5);

      // Organización de próximos eventos
      if(element.start > new Date() && hours > 5){
        this.nextEvents.push(element);
      }
      this.nextEvents = this.nextEvents.slice(0, 5);
    });
    let TIME_IN_MS = 2000;
    setTimeout( () => {
      this.admob.onAdDismiss()
      .subscribe(() => { console.log('User dismissed ad'); });
      let adId;
      if(this.platform.is('android')) {
        adId = 'ca-app-pub-3240812764495845/4978287685';
      } else if (this.platform.is('ios')) {
        adId = 'ca-app-pub-3240812764495845/9464327607';
      }
      this.admob.createBanner({
        adId: adId,
        position: this.admob.AD_POSITION.BOTTOM_CENTER,
        isTesting: true
      });
      this.admob.showBanner(this.admob.AD_POSITION.BOTTOM_CENTER);
    }, TIME_IN_MS);
    
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
