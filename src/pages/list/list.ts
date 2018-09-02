import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5/dist/md5';
import moment from 'moment';

import { EventsService } from '../../services/events';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  myDate: any;
  category: any;
  text: any;

  selectedDate: any;
  selectedCategory: any;
  selectedText: string = "";

  lastFilter: any;
  starred: boolean;

  hash: any;
  hashEvent: any;

  showEvents: any = [];
  allEvents: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: EventsService, public storage: Storage, public loadingController: LoadingController) {
    let loading = this.loadingController.create({ content: "Cargando..." });
    loading.present();
    this.allEvents = events.allEvents;
    this.keys().then(data => {
      events.allEvents.forEach(original => {
        let isStarred = false;
        data.forEach(element => {
          let key = element.replace('setting:', '');
          let hash = Md5.hashStr(JSON.stringify(original)).toString();
          if (key == hash) {
            let mainImage = this.getMainImage(original);
            isStarred = true;
            this.showEvents.push({ starred: true, mainImage: mainImage, event: original });
          }
        });
        if (!isStarred) {
          this.showEvents.push({ starred: false, mainImage: this.getMainImage(original), event: original })
        }
      });
      loading.dismiss();
    });
  }

  getMainImage(original) {
    let mainImage = "";
    return mainImage;
  }

  categoryFilter(category, change, load) {
    if(this.lastFilter == "category" && this.showEvents.length == 0){
      this.lastFilter = undefined;
    }
    this.category = category;
    let loading = this.loadingController.create({ content: "Cargando..." });
    if(this.lastFilter != "text" && load && category != null){
      loading.present();
    }
    let eventsFiltered = typeof this.lastFilter == "undefined" ? this.allEvents : this.generateCompleteEvent(this.showEvents);
    this.showEvents = [];
    eventsFiltered.forEach(element => {
      if (element.type == category) {
        this.isStarred(element).then(result => {
          if(result != null){
            result = true;
          }
          this.showEvents.push({ starred: result, mainImage: this.getMainImage(element), event: element });
        });
      }
    });

    // Otros filtros
    if(!change){
      this.lastFilter = "category";
    }
    if(this.lastFilter != "date" && typeof this.myDate != "undefined" && this.myDate.toString().length != 0){
      this.dateFilter(this.myDate, true, true);
    }
    if(this.lastFilter != "text" && typeof this.text != "undefined" && this.text.toString().length != 0){
      this.textFilter(this.text, true);
    }
    if(this.lastFilter != "text" && load && category != null){
      loading.dismiss();
    }
  }

  dateFilter(myDate, change, load) {
    if(this.lastFilter == "date" && this.showEvents.length == 0){
      this.lastFilter = undefined;
    }
    this.myDate = myDate;
    let loading = this.loadingController.create({ content: "Cargando..." });
    if(this.lastFilter != "text" && load && myDate != null){
      loading.present();
    }
    let eventsFiltered = typeof this.lastFilter == "undefined" ? this.allEvents : this.generateCompleteEvent(this.showEvents);
    this.showEvents = [];
    eventsFiltered.forEach(element => {
      if ((myDate.day == element.start.getDate() && element.start.getHours() >=5 && element.start.getMonth() == myDate.month - 1) || 
      (this.getTomorrow(myDate.day, myDate.month, new Date().getFullYear()) == element.start.getDate() && element.start.getHours() <=5 && this.getMonth(myDate.date, myDate.month, new Date().getFullYear() == myDate.month - 1))) {
        this.isStarred(element).then(result => {
          if(result != null){
            result = true;
          }
          this.showEvents.push({ starred: result, mainImage: this.getMainImage(element), event: element });
        });
      }
    });

    // Otros filtros
    if(!change){
      this.lastFilter = "date";
    }
    if(this.lastFilter != "category" && typeof this.category != "undefined" && this.category.toString().length != 0){
      this.categoryFilter(this.category, true, true);
    }
    if(this.lastFilter != "text" && typeof this.text != "undefined" && this.text.toString().length != 0){
      this.textFilter(this.text, true);
    }
    if(this.lastFilter != "text" && load && myDate != null){
      loading.dismiss();
    }
  }

  textFilter(text, change) {
    if(this.lastFilter == "text" && this.showEvents.length == 0){
      this.lastFilter = undefined;
    }
    this.text = text.value;
    if (typeof text.value != "undefined" && text.value.length > 3) {
      let eventsFiltered = typeof this.lastFilter == "undefined" ? this.allEvents : this.generateCompleteEvent(this.showEvents);
      this.showEvents = [];
      eventsFiltered.forEach(element => {
        var re = new RegExp(text.value, 'i');
        if (element.title.match(re)) {
          this.isStarred(element).then(result => {
            if(result != null){
              result = true;
            }
            this.showEvents.push({ starred: result, mainImage: this.getMainImage(element), event: element });
          });
        }
      });
    } else if(typeof text.value != "undefined" && text.value.length == 0){
      this.lastFilter = undefined;
    }

    // Otros filtros
    if(!change && typeof text.value != "undefined" && text.value.length > 3){
      this.lastFilter = "text";
    }
    if(this.lastFilter != "category" && typeof this.category != "undefined" && this.category.toString().length != 0){
      this.categoryFilter(this.category, true, false);
    }
    if(this.lastFilter != "date" && typeof this.myDate != "undefined" && this.myDate.toString().length != 0){
      this.dateFilter(this.myDate, true, false);
    }
  }

  deleteFilters(reconstruct) {
    this.showEvents = [];
    this.selectedCategory = null;
    this.selectedDate = null;
    this.selectedText = null;
    if(reconstruct){
      this.reconstruct();
    }
  }

  async isStarred(item) {
    let hash = Md5.hashStr(JSON.stringify(item)).toString();
    return this.get(hash);
  }

  starEvent(item) {
    let hash = Md5.hashStr(JSON.stringify(item.event)).toString();
    this.hash = hash;
    this.hashEvent = item.event;
    this.set(hash, hash).then(result =>
      {
        this.showEvents.forEach(element => {
          if(element.event == item.event){
            element.starred = true;
          }
        });
        this.allEvents.forEach(element => {
          if(element.event == item.event){
            element.starred = true;
          }
        });
        // let scheduledDate = item.event.start;
        // scheduledDate.setHours(scheduledDate.getHours() - 1);
        // this.localNotifications.schedule({
        //   id: this.hash.toString(),
        //   title: this.hashEvent.title.toString(),
        //   text: 'El evento: "' + this.hashEvent.title.toString() + ' comienza en 1h',
        //   trigger: {at: scheduledDate}
        // });
      }
    );
  }

  unstarEvent(item) {
    let hash = Md5.hashStr(JSON.stringify(item.event)).toString();
    this.remove(hash).then(result =>
      {
        this.showEvents.forEach(element => {
          if(element.event == item.event){
            element.starred = false;
          }
        });
        this.allEvents.forEach(element => {
          if(element.event == item.event){
            element.starred = false;
          }
        });
        // this.localNotifications.cancel(hash.toString());
      }
    );
  }

  generateCompleteEvent(array){
    let newArray = [];
    array.forEach(element => {
      newArray.push(element.event);
    });
    return newArray;
  }

  getTomorrow(date, month, year){
    var aux = moment({ year :year, month :month, day :date, hour :0, minute :0, second :0, millisecond :0});
    return aux.add('days', 1).date();
  }

  getMonth(date, month, year){
    var aux = moment({ year :year, month :month, day :date, hour :0, minute :0, second :0, millisecond :0});
    return aux.add('days', 1).month();
  }

  getYear(date, month, year){
    var aux = moment({ year :year, month :month, day :date, hour :0, minute :0, second :0, millisecond :0});
    return aux.add('days', 1).year();
  }

  reconstruct() {
    let loading = this.loadingController.create({ content: "Cargando..." });
    loading.present();
    this.showEvents = [];
    this.keys().then(data => {
      this.allEvents.forEach(original => {
        let isStarred = false;
        data.forEach(element => {
          let key = element.replace('setting:', '');
          let hash = Md5.hashStr(JSON.stringify(original)).toString();
          if (key == hash) {
            let mainImage = this.getMainImage(original);
            isStarred = true;
            this.showEvents.push({ starred: true, mainImage: mainImage, event: original });
          }
        });
        if (!isStarred) {
          this.showEvents.push({ starred: false, mainImage: this.getMainImage(original), event: original })
        }
      });
      loading.dismiss();
    });
  }

  yesterday() {
    let loading = this.loadingController.create({ content: "Cargando..." });
    loading.present();
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    this.deleteFilters(false);
    this.showEvents = [];
    this.keys().then(data => {
      this.allEvents.forEach(original => {
        let isStarred = false;
        data.forEach(element => {
          let key = element.replace('setting:', '');
          let hash = Md5.hashStr(JSON.stringify(original)).toString();
          if (key == hash) {
            let mainImage = this.getMainImage(original);
            isStarred = true;
            if((currentDate.getDate() == original.start.getDate() && original.start.getHours() >=5 && currentDate.getMonth() == original.start.getMonth() && currentDate.getFullYear() == original.start.getFullYear()) 
            || (this.getTomorrow(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getDate() && original.start.getHours() <=5
             && this.getMonth(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getMonth() 
             && this.getYear(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getFullYear())){
              this.showEvents.push({ starred: true, mainImage: mainImage, event: original });
            }
          }
        });
        if (!isStarred) {
          if((currentDate.getDate() == original.start.getDate() && original.start.getHours() >=5 && currentDate.getMonth() == original.start.getMonth() && currentDate.getFullYear() == original.start.getFullYear()) 
            || (this.getTomorrow(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getDate() && original.start.getHours() <=5
             && this.getMonth(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getMonth() 
             && this.getYear(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getFullYear())){
            this.showEvents.push({ starred: false, mainImage: this.getMainImage(original), event: original });
          }
        }
      });
      loading.dismiss();
    });
  }

  today() {
    let loading = this.loadingController.create({ content: "Cargando..." });
    loading.present();
    var currentDate = new Date();
    this.deleteFilters(false);
    this.showEvents = [];
    this.keys().then(data => {
      this.allEvents.forEach(original => {
        let isStarred = false;
        data.forEach(element => {
          let key = element.replace('setting:', '');
          let hash = Md5.hashStr(JSON.stringify(original)).toString();
          if (key == hash) {
            let mainImage = this.getMainImage(original);
            isStarred = true;
            if((currentDate.getDate() == original.start.getDate() && original.start.getHours() >=5 && currentDate.getMonth() == original.start.getMonth() && currentDate.getFullYear() == original.start.getFullYear()) 
            || (this.getTomorrow(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getDate() && original.start.getHours() <=5
             && this.getMonth(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getMonth() 
             && this.getYear(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getFullYear())){
              this.showEvents.push({ starred: true, mainImage: mainImage, event: original });
            }
          }
        });
        if (!isStarred) {
          if((currentDate.getDate() == original.start.getDate() && original.start.getHours() >=5 && currentDate.getMonth() == original.start.getMonth() && currentDate.getFullYear() == original.start.getFullYear()) 
            || (this.getTomorrow(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getDate() && original.start.getHours() <=5
             && this.getMonth(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getMonth() 
             && this.getYear(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getFullYear())){
            this.showEvents.push({ starred: false, mainImage: this.getMainImage(original), event: original })
          }
        }
      });
      loading.dismiss();
    });
  }

  tomorrow() {
    let loading = this.loadingController.create({ content: "Cargando..." });
    loading.present();
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    this.deleteFilters(false);
    this.showEvents = [];
    this.keys().then(data => {
      this.allEvents.forEach(original => {
        let isStarred = false;
        data.forEach(element => {
          let key = element.replace('setting:', '');
          let hash = Md5.hashStr(JSON.stringify(original)).toString();
          if (key == hash) {
            let mainImage = this.getMainImage(original);
            isStarred = true;
            if((currentDate.getDate() == original.start.getDate() && original.start.getHours() >=5 && currentDate.getMonth() == original.start.getMonth() && currentDate.getFullYear() == original.start.getFullYear()) 
            || (this.getTomorrow(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getDate() && original.start.getHours() <=5
             && this.getMonth(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getMonth() 
             && this.getYear(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getFullYear())){
              this.showEvents.push({ starred: true, mainImage: mainImage, event: original });
            }
          }
        });
        if (!isStarred) {
          if((currentDate.getDate() == original.start.getDate() && original.start.getHours() >=5 && currentDate.getMonth() == original.start.getMonth() && currentDate.getFullYear() == original.start.getFullYear()) 
            || (this.getTomorrow(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getDate() && original.start.getHours() <=5
             && this.getMonth(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getMonth() 
             && this.getYear(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) == original.start.getFullYear())){
            this.showEvents.push({ starred: false, mainImage: this.getMainImage(original), event: original })
          }
        }
      });
      loading.dismiss();
    });
  }

  customTrackBy(index: number, obj: any): any {
    return index;
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
