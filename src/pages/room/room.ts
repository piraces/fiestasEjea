import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddRoomPage } from '../add-room/add-room';
import { HomeChatPage } from '../home-chat/home-chat';
import * as firebase from 'firebase';
/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  rooms = [];
  ref = firebase.database().ref('chatrooms/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
  }

  addRoom() {
    this.navCtrl.push(AddRoomPage);
  }

  joinRoom(key) {
    this.navCtrl.setRoot(HomeChatPage, {
      key:key,
      nickname:this.navParams.get("nickname")
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }
}

export const snapshotToArray = snapshot => {
  let returnArr = [];
  let pinnedArr = [];
  let communityArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });
  returnArr.forEach(element => {
    if(element.pinned){
      pinnedArr.push(element);
    } else {
      communityArr.push(element);
    }
  });
  pinnedArr.sort();
  communityArr.sort();
  returnArr = pinnedArr.concat(communityArr);
  return returnArr;
};