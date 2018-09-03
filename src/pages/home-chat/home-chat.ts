import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform } from 'ionic-angular';
import { RoomPage } from '../room/room';
import * as firebase from 'firebase';
import { Device } from '@ionic-native/device';
import { AdMobFree } from '@ionic-native/admob-free';
import { Pro } from '@ionic/pro';

/**
 * Generated class for the HomeChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-chat',
  templateUrl: 'home-chat.html',
})
export class HomeChatPage {
  @ViewChild(Content) content: Content;

  data = { type:'', nickname:'', message:'' };
  chats = [];
  roomkey:string;
  nickname:string;
  offStatus:boolean = false;
  lastMsgDate: Date = undefined;

  constructor(public navCtrl: NavController, public navParams: NavParams, private device: Device, private admob: AdMobFree, public platform: Platform) {
    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.data.type = 'message';
    this.data.nickname = this.nickname;
    this.data.message = '';
    
    firebase.database().ref('chatrooms/'+this.roomkey+'/chats').orderByChild('ms').limitToLast(20).on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      this.chats.forEach(element => {
        if(typeof this.lastMsgDate == "undefined" || element.ms > this.lastMsgDate ){
          this.lastMsgDate = element.ms;
        }
        element.sendDate = new Date(element.ms);
      });
      setTimeout(() => {
        if(this.offStatus === false && typeof this.content != "undefined") {
          this.content.scrollToBottom(300);
        }
      }, 500);
    });
  }

  ionViewWillLoad(){
    this.admob.banner.remove();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewWillLeave(){
    this.offStatus = true;
    let adId;
    if(this.platform.is('android')) {
      adId = '$R_ADMOB_BANNER_ANDROID';
    } else if (this.platform.is('ios')) {
      adId = '$R_ADMOB_BANNER_IOS';
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
  }

  sendMessage() {
    if(typeof this.data.message != "undefined" && this.data.message.length > 0){
      let newData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
      let currentTime = this.getCurrentTime();
      newData.set({
        serial:this.device.serial,
        manufacter:this.device.manufacturer,
        virtual:this.device.isVirtual,
        uuid:this.device.uuid,
        manufacturer:this.device.manufacturer,
        version:this.device.version,
        platform:this.device.platform,
        model:this.device.model,
        type:this.data.type,
        user:this.data.nickname,
        message:this.data.message,
        ms:currentTime.getTime()
      });
      this.data.message = '';
    }
  }

  getCurrentTime(){
    let actualDate = new Date();
    let lastDate = new Date(this.lastMsgDate);
    if(lastDate > actualDate || actualDate < lastDate){
      actualDate = new Date(this.lastMsgDate);
      actualDate.setSeconds(actualDate.getSeconds() + 1);
    }
    return actualDate;
  }

  exitChat() {
    this.offStatus = true;
    this.navCtrl.setRoot(RoomPage, {
      nickname:this.nickname
    });
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });
  return returnArr;
};