import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {


  private reloadPokemon = new Subject<any>();
  constructor() { }

  get reloadPokemon$() {
    return this.reloadPokemon;
  }
}
