import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, APP_INITIALIZER, Injectable, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule, AlertController } from 'ionic-angular';
import { MyApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FavsPage } from '../pages/favs/favs';
import { PhonesPage } from '../pages/phones/phones';
import { AboutPage } from '../pages/about/about';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { ChatPage } from '../pages/chat/chat';
import { AddRoomPage } from '../pages/add-room/add-room';
import { HomeChatPage } from '../pages/home-chat/home-chat';
import { RoomPage } from '../pages/room/room';
import { CalendarviewPage } from '../pages/calendarview/calendarview';

// Modules
import { HomePageModule } from '../pages/home/home.module';
import { ListPageModule } from '../pages/list/list.module';
import { FavsPageModule } from '../pages/favs/favs.module';
import { PhonesPageModule } from '../pages/phones/phones.module';
import { AboutPageModule } from '../pages/about/about.module';
import { EventDetailPageModule } from '../pages/event-detail/event-detail.module';
import { ChatPageModule } from '../pages/chat/chat.module';
import { AddRoomPageModule } from '../pages/add-room/add-room.module';
import { HomeChatPageModule } from '../pages/home-chat/home-chat.module';
import { RoomPageModule } from '../pages/room/room.module';
import { CalendarviewPageModule } from '../pages/calendarview/calendarview.module';

import { EventsService } from '../services/events';

import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { DatePicker } from '@ionic-native/date-picker';
import { AdMobFree } from '@ionic-native/admob-free';
import { Device } from '@ionic-native/device';
import { Pro } from '@ionic/pro';
import { CalendarModule } from '../lock/ionic3-calendar-en';

export function eventsFactory(events: EventsService) {
  return  () => events.load();
}

Pro.init('991dda51', {
  appVersion: '1.0.1'
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;
  alerts: AlertController;
  splashScreen: SplashScreen;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
      this.alerts = injector.get(AlertController);
      this.splashScreen = injector.get(SplashScreen);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  async handleError(err: any) {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    //this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
    const alert = this.alerts.create({
      title: 'Ha ocurrido un error inesperado',
      subTitle: 'Lamentablemente, la app debe volverse a iniciar',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Reiniciar aplicación...',
          handler: () => {
            this.splashScreen.show();
            window.location.reload();
          }
        }
      ]
    });
    alert.present();
  }
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HomePageModule,
    ListPageModule,
    FavsPageModule,
    PhonesPageModule,
    AboutPageModule,
    EventDetailPageModule,
    ChatPageModule,
    AddRoomPageModule,
    HomeChatPageModule,
    RoomPageModule,
    CalendarviewPageModule,
    CalendarModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Volver'
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
    ChatPage,
    AddRoomPage,
    HomeChatPage,
    RoomPage,
    CalendarviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AlertController,
    CallNumber,
    AdMobFree,
    Device,
    InAppBrowser,
    EventsService,
    IonicErrorHandler,
    {
      provide: APP_INITIALIZER,
      useFactory: eventsFactory,
      deps: [EventsService],
      multi: true
    },
    DatePicker,
    {provide: ErrorHandler, useClass: MyErrorHandler }
  ]
})
export class AppModule {}
