import { Component, OnInit, isDevMode } from '@angular/core';
import { Events } from 'src/app/models/events';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events: Events[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.events = this.eventService.getEvents();
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }

}
