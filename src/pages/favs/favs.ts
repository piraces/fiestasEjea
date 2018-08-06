import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5/dist/md5';
import { EventsService } from '../../services/events';

/**
 * Generated class for the FavsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favs',
  templateUrl: 'favs.html',
})
export class FavsPage {
  favEvents: any = [];
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public events: EventsService) {
    this.keys().then(data => {
      events.allEvents.forEach(original => {
        data.forEach(element => {
          let key = element.replace('setting:', '');
          let hash = Md5.hashStr(JSON.stringify(original)).toString();
          if(key == hash){
            let mainImage = "";
            let starred = true;
            switch(original.type){
              case 'Otros':
                mainImage = "../../assets/imgs/otros.jpeg";
                break;
              case 'Toros':
                mainImage = "../../assets/imgs/toros.jpeg";
                break;
              case 'Música':
                mainImage = "../../assets/imgs/musica.jpeg";
                break;
              case 'Infantil':
                mainImage = "../../assets/imgs/infantil.jpeg";
                break;
              default:
                mainImage = "../../assets/imgs/otros.jpeg";
                break;
            }
            this.favEvents.push({starred: starred, mainImage: mainImage, event: original});
          }
        });
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavsPage');
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  unstarEvent(item){
    let hash = Md5.hashStr(JSON.stringify(item.event)).toString();
    var index = this.favEvents.indexOf(item);
    if (index > -1) {
      this.favEvents.splice(index, 1);
    }
    this.remove(hash);
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
  public async keys(){
    return await this.storage.keys();
  }
  public clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

}
