import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventsService {
  public allEvents:any = [];

  constructor(private http: HttpClient){
    // TODO: Await for response in order to inject
    this.http.get("https://raw.githubusercontent.com/piraces/fiestasEjea/master/events.json", {responseType: 'text'}).subscribe(response => {
        var events = JSON.parse(response);
        events.forEach(element => {
            element.start = new Date(element.start);
            element.end = new Date(element.end);
        });
        this.allEvents = events;
    });
  }
}