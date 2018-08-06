import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  @ViewChild(Content) content: Content;
  groups = [false, false, false, false, false];

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  toggleGroup(id) {
    this.groups[id] = !this.groups[id];
    let TIME_IN_MS = 300;
    setTimeout( () => {
      this.content.resize();
    }, TIME_IN_MS);
  }

  //Devuelve cierto si el grupo "id" se está mostrando.
  isGroupShown(id) {
      return this.groups[id];
  }

  openLink(link){
    this.iab.create(link);
  }

}
