import { Component, OnInit } from '@angular/core';
import { Characters, Result } from '../characters';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  public heroes?: Result[];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroesRam();
  }

  getHeroesRam(): void {
    this.heroService.getHeroeRram()
    .subscribe(heroes => this.heroes = heroes)
  }
}
