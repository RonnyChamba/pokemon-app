import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environmet/environmet';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  API= environment.apiUrl;
  API_POKEMON= environment.apiPokemon;
  constructor(
    private http: HttpClient

  ) { }

  
  findPokemon(id: number) {
    return this.http.get(`${this.API}/search/${id}`);
  }
  
  findEditPokemon(id: number) {
    return this.http.get(`${this.API}/${id}`);
  }

  savePokemon(data: any, id?: any) {

    if (id) {
      return this.http.put(`${this.API}/${id}`, data);
    }
    
    return this.http.post(`${this.API}`, data);
  }

  getAllPokemon() {
    return this.http.get(`${this.API}`);
  }

  deletePokemon(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
