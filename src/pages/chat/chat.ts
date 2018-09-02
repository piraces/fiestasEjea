import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomPage } from  '../room/room';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  terms: boolean;
  error: boolean = false;
  data = { nickname:"" };

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser, public storage: Storage) {
    this.get("nickname").then((result)=>{
      if(result != null){
        this.data.nickname = result;
      }
    });
    this.get("terms").then((result)=>{
      if(result != null){
        this.terms = result;
      }
    });
  }

  enterNickname() {
    if(this.terms === true && this.data.nickname.length > 0){
      this.error = false;
      this.set("nickname", this.data.nickname);
      this.set("terms", this.terms);
      this.navCtrl.setRoot(RoomPage, {
        nickname: this.data.nickname
      });
    } else {
      this.error = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  openLink(link){
    this.iab.create(link);
  }

  public set(settingName, value) {
    return this.storage.set(`setting:${settingName}`, value);
  }
  public async get(settingName) {
    return await this.storage.get(`setting:${settingName}`);
  }
  public async remove(settingName) {
    return await this.storage.remove(`setting:${settingName}`);
  }
  public async keys() {
    return await this.storage.keys();
  }
  public clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

}
