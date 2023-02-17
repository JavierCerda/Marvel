import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';
import { Characters, Result } from './characters';


@Injectable({ providedIn: 'root' })
export class HeroService {
  private urlRam: string = "http://gateway.marvel.com/v1/public/characters"//?ts=marvel&apikey=89733b33cc47007a79601674bed30e0d&hash=baaadcd5094d4d728a5c11e6df9985c7";
  private numDefault = 0;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getHeroeRram(): Observable<Result[]> {
    let num = Math.floor(Math.random() * 1532);
    let url : string = this.urlRam + "?ts=marvel&offset=" + num + "&apikey=89733b33cc47007a79601674bed30e0d&hash=baaadcd5094d4d728a5c11e6df9985c7";
    return this.http.get<Characters>(url).pipe(
     (map((resul:Characters )=> resul.data.results))
    )
  }
  getHeroes(): Observable<Result[]> {
    let url : string = this.urlRam + "?ts=marvel&limit=20&apikey=89733b33cc47007a79601674bed30e0d&hash=baaadcd5094d4d728a5c11e6df9985c7";
    return this.http.get<Characters>(url).pipe(
     (map((resul:Characters )=> resul.data.results))
    )
  }
  
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
      let url : string = this.urlRam + "?ts=marvel&nameStartsWith=" + `${term}` + "&limit=5&apikey=89733b33cc47007a79601674bed30e0d&hash=baaadcd5094d4d728a5c11e6df9985c7";
      return this.http.get<Characters>(url).pipe(
       (map((resul:Characters )=> resul.data.results))
      )
  }
  sig(): Observable<Result[]> {
    this.numDefault = this.numDefault+20;
    console.log(this.numDefault);
      let url : string = this.urlRam + "?ts=marvel&limit=20&offset=" + this.numDefault + "&apikey=89733b33cc47007a79601674bed30e0d&hash=baaadcd5094d4d728a5c11e6df9985c7";
      return this.http.get<Characters>(url).pipe(
       (map((resul:Characters )=> resul.data.results))
      )
  }
  ant(): Observable<Result[]> {
    if(this.numDefault!==0 && this.numDefault>0){
      this.numDefault = this.numDefault-20;
    console.log(this.numDefault);
    let url : string = this.urlRam + "?ts=marvel&limit=20&offset=" + this.numDefault + "&apikey=89733b33cc47007a79601674bed30e0d&hash=baaadcd5094d4d728a5c11e6df9985c7";
    return this.http.get<Characters>(url).pipe(
     (map((resul:Characters )=> resul.data.results))
    )
    }
    return this.http.get<Characters>("?ts=marvel&limit=20&offset=0&apikey=89733b33cc47007a79601674bed30e0d&hash=baaadcd5094d4d728a5c11e6df9985c7").pipe(
      (map((resul:Characters )=> resul.data.results))
    )
}

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.urlRam}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Result[]> {
    const url = this.urlRam + "/" + id +"?ts=marvel&apikey=89733b33cc47007a79601674bed30e0d&hash=baaadcd5094d4d728a5c11e6df9985c7";
    
    return this.http.get<Characters>(url).pipe(
      (map((resul:Characters )=> resul.data.results))
     )
  }



  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.urlRam, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
