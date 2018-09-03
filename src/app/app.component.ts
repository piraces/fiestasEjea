import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree } from '@ionic-native/admob-free';
import { Pro } from '@ionic/pro';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CalendarviewPage } from '../pages/calendarview/calendarview';
import { FavsPage } from '../pages/favs/favs';
import { PhonesPage } from '../pages/phones/phones';
import { AboutPage } from '../pages/about/about';
import { ChatPage } from '../pages/chat/chat';

import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  intersitialReady: boolean = true;
  intersitial: any;
  banner: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private admob: AdMobFree) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage, icon: 'home' },
      { title: 'Programa', component: ListPage, icon: 'paper' },
      { title: 'Calendario', component: CalendarviewPage, icon: 'calendar' },
      { title: 'Favoritos', component: FavsPage, icon: 'star' },
      { title: 'Teléfonos', component: PhonesPage, icon: 'call' },
      { title: 'Sobre las fiestas', component: AboutPage, icon: 'information-circle' },
      { title: 'Chat', component: ChatPage, icon: 'chatboxes'}
    ];

    let config = {
      apiKey: '$FIREBASE_APIKEY',
      authDomain: '$FIREBASE_AUTHDOMAIN',
      databaseURL: '$FIREBASE_DATABASEURL',
      projectId: '$FIREBASE_PROJECTID',
      storageBucket: '$FIREBASE_STORAGEBUCKET',
      messagingSenderId: "$FIREBASE_MESSAGESENDERID"
    };

    firebase.initializeApp(config);

    this.platform.ready().then(() => {
      this.admob.banner.remove();
      // Ads section
      let adId;
      if(this.platform.is('android')) {
        adId = '$ADMOB_BANNER_ANDROID';
      } else if (this.platform.is('ios')) {
        adId = '$ADMOB_BANNER_IOS';
      }

      this.admob.banner.config({
        id: adId,
        isTesting: false,
        autoShow: true
      });

      this.admob.banner.prepare().then((result)=>{
        console.log(result);
      },(reason)=>{
        Pro.monitoring.handleNewError(reason);
      });

      let TIME_IN_MS_INTERSITIAL = 120000;
      this.intersitial = setTimeout( () => {
        let interstitialId ;
        if(this.platform.is('android')) {
          adId = '$ADMOB_BANNER_ANDROID';
          interstitialId = '$ADMOB_INTERSITIAL_ANDROID';
        } else if (this.platform.is('ios')) {
          adId = '$ADMOB_BANNER_IOS';
          interstitialId = '$ADMOB_INTERSITIAL_IOS';
        }
        
        this.admob.interstitial.config({
          id: interstitialId,
          isTesting: false,
          autoShow: true,
          });
        this.admob.interstitial.prepare().then((result)=>{
          console.log(result);
        },(reason)=>{
          Pro.monitoring.handleNewError(reason);
        });
      }, TIME_IN_MS_INTERSITIAL);
      
      //Subscribe on pause
      this.platform.pause.subscribe(() => {
        clearTimeout(this.intersitial);
      });
      //Subscribe on resume
      this.platform.resume.subscribe(() => {
        this.admob.banner.remove();
        // Ads section
        let adId;
        if(this.platform.is('android')) {
          adId = '$ADMOB_BANNER_ANDROID';
        } else if (this.platform.is('ios')) {
          adId = '$ADMOB_BANNER_IOS';
        }
        
        this.admob.banner.config({
          id: adId,
          isTesting: false,
          autoShow: true
        });

        this.admob.banner.prepare().then((result)=>{
          console.log(result);
        },(reason)=>{
          Pro.monitoring.handleNewError(reason);
        });

        this.intersitial = setTimeout( () => {
          let interstitialId ;
          if(this.platform.is('android')) {
            adId = '$ADMOB_BANNER_ANDROID';
            interstitialId = '$ADMOB_INTERSITIAL_ANDROID';
          } else if (this.platform.is('ios')) {
            adId = '$ADMOB_BANNER_IOS';
            interstitialId = '$ADMOB_INTERSITIAL_IOS';
          }
          
          this.admob.interstitial.config({
            id: interstitialId,
            isTesting: false,
            autoShow: true,
            });
          this.admob.interstitial.prepare().then((result)=>{
            console.log(result);
          },(reason)=>{
            Pro.monitoring.handleNewError(reason);
          });
        }, TIME_IN_MS_INTERSITIAL);
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
