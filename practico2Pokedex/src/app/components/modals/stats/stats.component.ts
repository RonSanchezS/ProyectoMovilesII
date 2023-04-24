import { Component, Input, OnInit } from '@angular/core';
import { Pokedex } from 'src/app/models/Pokedex';
import { Pokemon } from 'src/app/models/Pokemon';
import { Species } from 'src/app/models/Species';
import { Tipo } from 'src/app/models/Tipo';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  @Input()
  pokemon!: Pokemon;

  @Input()
  especiePokemon!: Species;

  @Input()
  tipoPokemon!: Pokedex;

  relacionesDeDmg: Set<string> = new Set();

  sumaDeStats: number = 0;

  tipoInspeccionado?: Tipo;

  diccionarioDmg: Record<string, number> = {};

  stats: {
    statName: string;
    maxStat: number;
    minStat: number;
    baseValue: number;
  }[] = [];

  obtenerStatsMaximas() {
    let baseStats = this.pokemon.stats;
    let maxIV = 31;
    let maxEV = 252;
    let natureMod = 1.1; // para la stat que aumenta
    let natureDemod = 0.9; // para la stat que disminuye

    for (let stat of baseStats) {
      let baseValue = stat.base_stat;
      let statName = stat.stat.name;
      if (statName == 'hp') {
        let maxStat = Math.floor((((2*baseValue+31+(252/4))*100)/100)+110);
        let minStat = Math.floor((((2*baseValue+0+(0/4))*100)/100)+110);
        this.stats.push({ statName, maxStat, minStat, baseValue });
      } else {
        let maxStat = Math.floor(((((2*baseValue+31+(252/4))*100)/100)+5)*natureMod);
        let minStat = Math.floor(((((2*baseValue+0+(0/4))*100)/100)+5)*natureDemod);
        this.stats.push({ statName, maxStat, minStat, baseValue });
      }
    }
    this.sumaDeStats = this.stats.reduce((a, b) => a + b.baseValue, 0);
  }

  min(valorBase: number, valorFijo: number) {
    return Math.min(valorBase, valorFijo);
  }
  constructor(private api: PokeApiService) {}

  ngOnInit() {
    console.log(this.pokemon.stats);
    console.log(this.especiePokemon);
    this.obtenerStatsMaximas();
    this.getTipoPokemon();
    this.initDiccionario();
  }
  initDiccionario() {
    this.tipoPokemon.results.forEach((element) => {
      this.diccionarioDmg[element.name] = 1;
    });
  }
  getTipoPokemon() {
    let tiposPokemon = this.pokemon.types.map((tipo) => {
      return tipo.type.url;
    });
    this.initDiccionario();
    //llamar a la api para traer los tipos de pokemon, pasando como parametro tiposPokemon
    //y guardarlos en un array
    tiposPokemon.forEach((element) => {
      this.api.getInformacionDeTipo(element).subscribe((data) => {
        data.damage_relations.double_damage_from.forEach((element) => {
          this.relacionesDeDmg.add(element.name);
          switch (this.diccionarioDmg[element.name]) {
            case 1:
              this.diccionarioDmg[element.name] = 2;
              break;
            case 2:
              this.diccionarioDmg[element.name] = 4;
              break;
            case 0.5:
              this.diccionarioDmg[element.name] = 1;
              break;
            case 0.25:
              this.diccionarioDmg[element.name] = 0.5;
              break;
          }
        });
        //check for half damage
        data.damage_relations.half_damage_from.forEach((element) => {
          this.relacionesDeDmg.delete(element.name);
          switch (this.diccionarioDmg[element.name]) {
            case 1:
              this.diccionarioDmg[element.name] = 0.5;
              break;
            case 2:
              this.diccionarioDmg[element.name] = 1;
              break;
            case 0.5:
              this.diccionarioDmg[element.name] = 0.25;
              break;
            case 0.25:
              this.diccionarioDmg[element.name] = 0.125;
              break;
          }
        });
        data.damage_relations.no_damage_from.forEach((element) => {
          this.relacionesDeDmg.delete(element.name);
          this.diccionarioDmg[element.name] = 0;
        }
        );
      });
    });
  }
  @Input()
  colorTexto: string = '#FFF555';

  getColorTipo(){
    return { 'color': `${this.colorTexto}` };
  }
  getColorForProgressBar(){
    return {
      '--background': 'transparent',
      '--progress-background': `${this.colorTexto}`
    };
  } 
  getColorItem(item : string){
    console.log(item);
    switch (item) {
      case 'grass':
        return { 'background-color': 'rgb(139,190,138)' };
      case 'fire':
        return { 'background-color': 'rgb(255,167,86)' };
      case 'water':
        return { 'background-color': 'rgb(88,171,246)' };
      case 'bug':
        return { 'background-color': 'rgb(139,214,116)' };
      case 'normal':
        return { 'background-color': 'rgb(181,185,196)' };
      case 'poison':
        return { 'background-color': 'rgb(159,110,151)' };
      case 'electric':
        return { 'background-color': 'rgb(242,203,85)' };
      case 'ground':
        return { 'background-color': 'rgb(247,133,81)' };
      case 'fairy':
        return { 'background-color': 'rgb(235,168,195)' };
      case 'fighting':
        return { 'background-color': 'rgb(235,73,113)' };
      case 'psychic':
        return { 'background-color': 'rgb(255,101,104)' };
      case 'rock':
        return { 'background-color': 'rgb(212,194,148)' };
      case 'ghost':
        return { 'background-color': 'rgb(133,112,190)' };
      case 'ice':
        return { 'background-color': 'rgb(145,216,223)' };
      case 'dragon':
        return { 'background-color': 'rgb(115,131,185)' };
      case 'dark':
        return { 'background-color': 'rgb(111,110,120)' };
      case 'steel':
        return { 'background-color': 'rgb(76,145,178)' };
      case 'flying':
        return { 'background-color': 'rgb(131,162,227)' };
      default:
        return { 'background-color': 'white' };
    }
  }
}
