import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Pro } from '@ionic/pro';

import { Observable } from "rxjs/Rx";

@Injectable()
export class EventsService {
  public allEvents: any;

  constructor(private http: HttpClient, public storage: Storage){
    
  }

  load(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.http.get("https://raw.githubusercontent.com/piraces/fiestasEjea/master/events.min.json", {responseType: 'text'})
      .timeout(5000)
      .catch((err) => {
              let details = err.json();
              Pro.monitoring.handleNewError(details);
              this.allEvents = [];
              resolve(true);
              return Observable.throw(new Error(details));
      }).subscribe(
        response => {
          var events = JSON.parse(response);
          events.forEach(element => {
              element.start = new Date(element.start);
              element.end = new Date(element.end);
          });
          this.allEvents = events;
          resolve(true);
        },
        error => {
          // Try to get from localstorage
          this.get("localevents").then(result => {
            if(result != null){
              // LocalStorage
              var events = JSON.parse(result);
              events.forEach(element => {
                element.start = new Date(element.start);
                element.end = new Date(element.end);
              });
              this.allEvents = events;
              resolve(true);
            } else {
              this.allEvents = [];
              resolve(true);
            }
          });
        },
        () => {
          // 'onCompleted' callback.
          // No errors, route to new page here
      });
    });
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