import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventsService {
  public allEvents: any;

  constructor(private http: HttpClient){
    
  }

  load(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.http.get("https://raw.githubusercontent.com/piraces/fiestasEjea/master/events.min.json", {responseType: 'text'}).subscribe(
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
          // TODO: Save locally
          this.allEvents = [];

        },
        () => {
          // 'onCompleted' callback.
          // No errors, route to new page here
      });
    });
  }
}