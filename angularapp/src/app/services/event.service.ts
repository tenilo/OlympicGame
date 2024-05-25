import { Injectable } from '@angular/core';
import { Events } from '../models/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  getEvents(): Events[] {
    return [
      {
        id: 1,
        name: 'Athlétisme',
        description: 'Assistez à des courses époustouflantes et des prouesses athlétiques!',
        image: 'assets/img/track.jpeg'
      },
      {
        id: 2,
        name: 'Natation',
        description: 'Vivez la compétition intense dans l\'eau!',
        image: 'assets/img/swimming.jpeg'
      },
      {
        id: 3,
        name: 'Gymnastique',
        description: 'Admirez l\'agilité et la grâce des gymnastes dans diverses disciplines.',
        image: 'assets/img/gymnastics.jpeg'
      },
      {
        id: 4,
        name: 'Basketball',
        description: 'Regardez les meilleurs joueurs du monde s\'affronter sur le parquet.',
        image: 'assets/img/basketball.jpeg'
      },
      {
        id: 5,
        name: 'Football',
        description: 'Suivez les matchs passionnants du tournoi olympique de football.',
        image: 'assets/img/football.jpeg'
      },
      {
        id: 6,
        name: 'Cyclisme',
        description: 'Experience the excitement of road and track cycling events.',
        image: 'assets/img/cycling.jpeg'
      },
      {
        id: 7,
        name: 'Boxe',
        description: 'Soyez témoin de confrontations intenses dans le ring de boxe.',
        image: 'assets/img/boxing.jpeg'
      },
      {
        id: 8,
        name: 'Tennis',
        description: 'Regardez les meilleurs tennismen du monde s\'affronter sur le court.',
        image: 'assets/img/tennis.jpeg'
      }
    ];
  }
}
