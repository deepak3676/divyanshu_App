import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MeetService {
  private apiUrl = 'http://165.22.223.179:8080/api';
  private eventsSubject = new BehaviorSubject<any[]>([]);
  public events$ = this.eventsSubject.asObservable();

  constructor(private http: HttpClient) {}

  addEvent(events: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Scheduler/AddEvent`, events);
  }

  deleteEvent(eventToDelete: any): Observable<any> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: eventToDelete,
    };
    return this.http.delete<any>(
      `${this.apiUrl}/Scheduler/DeleteEvent`,
      options
    );
  }

  updateEvent(updatedEvent: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/Scheduler/UpdateEvent`, updatedEvent);
  }
}

