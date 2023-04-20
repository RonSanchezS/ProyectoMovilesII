import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokedex } from '../models/Pokedex';
import { Pokemon } from '../models/Pokemon';
import { Species } from '../models/Species';
import {  Tipo } from '../models/Tipo';
import { EvolutionChainn } from '../models/EvolutionChain';
import { Location } from '../models/LocationEncounters';
import { GenPuesQueMas } from '../models/generation';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  

  constructor(private http : HttpClient) { }


  getPokemonPorEspeciesURL(element: string) {
    return this.http.get<Species>(element);
  }
  getListaPokemonPorGeneracion(generacion : number) {
    console.log("generacion: " + generacion);
    return Promise.resolve(this.http.get<GenPuesQueMas>(`https://pokeapi.co/api/v2/generation/${generacion}`));
  }
  getListaPokemon(number : number, offset : number) {
    return this.http.get<Pokedex>("https://pokeapi.co/api/v2/pokemon/?offset=offset&limit=number");
  }
  getListaPokemonPorEvento(event : any) {
    let offset = event.detail.value.lower-1;
    let number = event.detail.value.upper-1;
    console.log("number: " + number + " offset: " + offset);
    return this.http.get<Pokedex>(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${number}`);
  }
  getListaPokemonPorEvento2(min : number, max : number) {
    let offset = min
    let number = max
    console.log("number: " + number + " offset: " + offset);
    return this.http.get<Pokedex>(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${number}`);
  }
  getPokemonIndividual(url : string) {
    return this.http.get<Pokemon>(url);
  }
  getPokemonIndividualDetallado(id : number | string) {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
  getTiposDePokemon() {
    return this.http.get<Pokedex>("https://pokeapi.co/api/v2/type/?limit=100");
  }
  getPokemonPorEspecies(int : number){
    return this.http.get<Species>(`https://pokeapi.co/api/v2/pokemon-species/${int}`);
  }
  getInformacionDeTipo(url : string){
    return this.http.get<Tipo>(url);
  }
  getEggGroups(url : string){
    return this.http.get(url);
  }
  getEvolutionChain(url : string){
    return this.http.get<EvolutionChainn>(url);
  }
  getUbicaciones(url : string){
    return this.http.get<Location[]>(url);
  }
}
