import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './heroes/models/hero.model';
import * as ow_heroes_list from './mocks/ow_heroes_list.json';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const heroes: Hero[] = (ow_heroes_list as any).default;
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}