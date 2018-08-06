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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.event = navParams.data;
    switch(this.event.type){
      case 'Otros':
        this.mainImage = "../../assets/imgs/otros.jpeg";
        break;
      case 'Toros':
        this.mainImage = "../../assets/imgs/toros.jpeg";
        break;
      case 'Música':
        this.mainImage = "../../assets/imgs/musica.jpeg";
        break;
      case 'Infantil':
        this.mainImage = "../../assets/imgs/infantil.jpeg";
        break;
      default:
        this.mainImage = "../../assets/imgs/otros.jpeg";
        break;
    }
    this.hash = Md5.hashStr(JSON.stringify(this.event)).toString();
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
  }

  starEvent(){
    this.set(this.hash, this.hash);
    this.starred = true;
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
