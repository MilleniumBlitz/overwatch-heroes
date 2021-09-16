import { Component, OnInit, HostBinding } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';

import { Hero } from './models/hero.model';
import { HeroService } from '../hero.service';

const role_all = "all"
const role_tank = "tank";
const role_dps = "damage";
const role_support = "support";
const hero_detail_page_url = "/hero/"



const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(':enter',
      [style({ opacity: 0 }), stagger('40ms', animate('600ms ease-out', style({ opacity: 1 })))],
      { optional: true }
    )
  ])
]);


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  animations: [listAnimation]
})
export class HeroesComponent implements OnInit {
  
  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];
  
  filters = [
    {key: role_all, is_active: false},
    {key: role_tank, is_active: false},
    {key: role_dps, is_active: false},
    {key: role_support, is_active: false}
  ]

   /* filters: {[key: string]: boolean} = {
    role_tank: false,
    role_dps: false,
    role_support: false,
    "": false
  } */

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().
      subscribe(heroes => {
        this.heroes = heroes, 
        this.filterHeroesByRole("all")
      })
  }

  showAll() {
    this.filteredHeroes = this.heroes
  }

  filterHeroesByRole(role: string) {

    /* Find active filter, disable all others */
    for (let filter of this.filters) {
      if (filter.key === role) { filter.is_active = true}
      else (filter.is_active = false)
    }

    /* this.filters.find(i => i.key == role)!.is_active = true */
    if (role != "all") {
      this.filteredHeroes = this.heroes.filter(x => x.role == role)
    }
    else {
      this.showAll()
    }
  }

  onSelect(hero: Hero) {
    this.router.navigateByUrl(hero_detail_page_url + hero.id);
  }

}