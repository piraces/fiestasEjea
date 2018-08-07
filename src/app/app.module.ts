import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FavsPage } from '../pages/favs/favs';
import { PhonesPage } from '../pages/phones/phones';
import { AboutPage } from '../pages/about/about';
import { EventDetailPage } from '../pages/event-detail/event-detail';


import { EventsService } from '../services/events';

import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { DatePicker } from '@ionic-native/date-picker';
import { AdMobPro } from '@ionic-native/admob-pro';
import { ChatPage } from '../pages/chat/chat';


export function eventsFactory(events: EventsService) {
  return  () => events.load();
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    FavsPage,
    PhonesPage,
    AboutPage,
    EventDetailPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Volver',
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    FavsPage,
    PhonesPage,
    AboutPage,
    EventDetailPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    AdMobPro,
    InAppBrowser,
    EventsService,
    {
      provide: APP_INITIALIZER,
      useFactory: eventsFactory,
      deps: [EventsService],
      multi: true
    },
    DatePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
