import { Injectable } from '@angular/core';
@Injectable()
export class ConfigService {
  public firebaseConfig = {
    apiKey: 'AIzaSyAMGaCJ0WGTQfjPa05b5_EAHJvasbzbt_s',
    authDomain: 'fiestas-de-ejea.firebaseapp.com',
    databaseURL: 'https://fiestas-de-ejea.firebaseio.com',
    projectId: 'fiestas-de-ejea',
    storageBucket: 'fiestas-de-ejea.appspot.com',
    messagingSenderId: "1093028778751"
  };

  public admobBannerIos = 'ca-app-pub-3240812764495845/9464327607';
  public admobBannerAndroid = 'ca-app-pub-3240812764495845/4978287685';

  public admobIntersitialIos = 'ca-app-pub-3240812764495845/6437675173';
  public admobIntersitialAndroid = 'ca-app-pub-3240812764495845/2290654400';

  constructor(){
    
  }

  $FIREBASE_APIKEY
  $FIREBASE_AUTHDOMAIN
  $FIREBASE_DATABASEURL
  $FIREBASE_PROJECTID
  $FIREBASE_STORAGEBUCKET
  $FIREBASE_MESSAGESENDERID

  $ADMOB_BANNER_IOS
  $ADMOB_BANNER_ANDROID

  $ADMOB_INTERSITIAL_IOS
  $ADMOB_INTERSITIAL_ANDROID
}