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
      if (statName != 'hp') {
        let maxStat = Math.floor(
          Math.floor(
            ((baseValue * (2 * maxIV + maxEV)) / 100 + 5) * natureMod
          ) * 0.89
        );
        let minStat = Math.floor(
          (Math.floor(
            Math.floor(
              ((baseValue * (2 * maxIV + maxEV)) / 100 + 5) * natureDemod
            ) * 0.9
          ) /
            2) *
            1.43
        );
        this.stats.push({ statName, maxStat, minStat, baseValue });
      } else {
        let maxStat = Math.floor(
          Math.floor(((baseValue * (2 * maxIV + maxEV)) / 100 + 5) * natureMod)
        );
        let minStat = Math.floor(
          Math.floor(
            Math.floor(
              ((baseValue * (2 * maxIV + maxEV)) / 100 + 5) * natureDemod
            ) * 0.9
          )
        );
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
      });
    });
  }
  @Input()
  colorTexto: string = '#FFF555';

  getColorTipo(){
    return { 'color': `${this.colorTexto}` };
  }
}
