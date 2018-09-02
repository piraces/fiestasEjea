import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5/dist/md5';

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  mainImage: string;
  event: any;
  starred: boolean;
  hash: any;
  hashEvent: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.event = navParams.data;
    this.mainImage = "";
    this.hash = Md5.hashStr(JSON.stringify(this.event)).toString();
    this.hashEvent = this.event;
    this.get(this.hash).then(data => {
      this.starred = data != null;
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

  unstarEvent(){
    this.remove(this.hash);
    this.starred = false;
    // this.localNotifications.cancel(this.hash.toString());
  }

  starEvent(){
    this.set(this.hash, this.hash).then(result => {
      this.starred = true;
      // let scheduledDate = this.hashEvent.start;
      // scheduledDate.setHours(scheduledDate.getHours() - 1);
      // this.localNotifications.schedule({
      //   id: this.hash.toString(),
      //   title: this.hashEvent.title.toString(),
      //   text: 'El evento: "' + this.hashEvent.title.toString() + ' comienza en 1h',
      //   trigger: {at: scheduledDate}
      // });
    });
  }

  public set(settingName,value){
    return this.storage.set(`setting:${ settingName }`,value);
  }
  public async get(settingName){
    return await this.storage.get(`setting:${ settingName }`);
  }
  public async remove(settingName){
    return await this.storage.remove(`setting:${ settingName }`);
  }
  public clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

}
