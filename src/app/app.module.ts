import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    FavsPage,
    PhonesPage,
    AboutPage,
    EventDetailPage
  ],
  imports: [
    BrowserModule,
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
    EventDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    AdMobPro,
    InAppBrowser,
    EventsService,
    DatePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
