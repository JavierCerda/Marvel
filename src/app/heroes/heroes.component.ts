import { Component, OnInit } from '@angular/core';
import { Result } from '../characters';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes?: Result[];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  sig(): void {
    this.heroService.sig()
    .subscribe(heroes => this.heroes = heroes);
  }

  ant(): void {
    this.heroService.ant()
    .subscribe(heroes => this.heroes = heroes);
  }
}
