import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokedex } from '../models/Pokedex';
import { Pokemon } from '../models/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private http : HttpClient) { }

  getListaPokemon() {
    return this.http.get<Pokedex>("https://pokeapi.co/api/v2/pokemon/?limit=50");
  }
  getPokemonIndividual(url : string) {
    return this.http.get<Pokemon>(url);
  }
  getTiposDePokemon() {
    return this.http.get<Pokedex>("https://pokeapi.co/api/v2/type/?limit=100");
  }
}
