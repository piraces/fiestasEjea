import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the PhonesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phones',
  templateUrl: 'phones.html',
})
export class PhonesPage {
  emergencyPhones = [
    { title: 'Guardia Civil', phone: '062' },
    { title: 'Guardia Civil fijo', phone: '976 67 71 40' },
    { title: 'Policía Nacional', phone: '091' },
    { title: 'Policía Local', phone: '092' },
    { title: 'Policía Local fijo', phone: '976 66 01 01' },
    { title: 'Emergencias Protección Civil', phone: '006' },
    { title: 'Bomberos', phone: '976 66 76 86' },
    { title: 'Cruz Roja', phone: '062' },
    { title: 'Violencia de Género', phone: '016' },
    { title: 'S.O.S. Aragón', phone: '112' }
  ]
  infoPhones = [
    { title: 'Ayuntamiento', phone: '976 67 74 74' },
    { title: 'Información al consumidor', phone: '976 66 15 15' },
    { title: 'Gobierno de Aragón', phone: '976 67 71 73' },
    { title: 'D. P. Z.', phone: '976 67 71 00' }
  ]
  transportPhones = [
    { title: 'RENFE', phone: '902 24 02 02' },
    { title: 'Autobuses Cinco Villas', phone: '976 66 09 80' },
    { title: 'Autocares Sanz', phone: '976 66 31 46' }
  ]
  healthPhones = [
    { title: 'Seguridad Social: Urgencias', phone: '976 66 17 642' },
    { title: 'Seguridad Social: Cita', phone: '976 66 18 61' },
    { title: 'Hogar de la Tercera Edad', phone: '976 66 02 54' },
    { title: 'Funeraria Cinco Villas', phone: '976 66 45 66' },
    { title: 'Funeraria Vinue', phone: '976 66 14 86' }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhonesPage');
  }
  
  callPhone(phone) {
    this.callNumber.callNumber(phone, true)
    .then(res => {
      console.log("Success launching dialer. Phone: " + phone);
    })
    .catch(err => {
      let alert = this.alertCtrl.create({
        title: 'Error al llamar, por favor intente llamar manualmente...',
        buttons: ['Cancelar']
      });
      alert.present();
    });
  }

}
