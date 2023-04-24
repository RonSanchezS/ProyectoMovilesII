import { Component, ViewChild } from '@angular/core';
import { IonModal, IonicModule } from '@ionic/angular';
import { PokeApiService } from '../services/poke-api.service';
import { HttpClientModule } from '@angular/common/http';
import { Pokedex, Result } from '../models/Pokedex';
import { CommonModule } from '@angular/common';
import { Pokemon, GenerationI } from '../models/Pokemon';
import { forkJoin, min, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { ModalsModule } from '../components/modals/modals.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, ModalsModule],
  providers: [PokeApiService],
})
export class HomePage {
  @ViewChild(IonModal) modal: IonModal | undefined;

  pokedex: Pokedex | null = null;

  pokedexTipos: Pokedex | null = null;

  pokedexResults: Result[] | null = null;
  listaPokemon: Pokemon[] | null = null;
  listaMostrados: Pokemon[] | null = null;
  loading: Boolean = true;

  tiposPokemon: string[] = [];
  /////////////////////////////MODAL SORT

  ///////////////////////////////////

  filtrosSet: Set<String> = new Set<String>();
  filtrosSetDebilidades: Set<String> = new Set<String>();
  constructor(private api: PokeApiService, private router: Router) {
    this.getDatosIniciales();
  }
  pokemonDetalle(id: number) {
    this.router.navigate(['/pokemon-detalle', id]);
  }
  getDatosIniciales() {
    this.api
      .getListaPokemon(50, 0)
      .pipe(
        switchMap((data) => {
          this.pokedex = data;
          this.pokedexResults = data.results;
          return forkJoin(
            data.results.map((pokemon) => {
              return this.api.getPokemonIndividual(pokemon.url);
            })
          );
        })
      )
      .subscribe((data) => {
        this.listaPokemon = data;
        this.listaMostrados = this.listaPokemon;
        this.loading = false;
      });
    this.api.getTiposDePokemon().subscribe((data: Pokedex) => {
      data.results.forEach((element) => {
        this.tiposPokemon.push(element.name);
      });
      console.log(this.tiposPokemon);
    });
  }
  filterByType(type: string) {
    if (this.listaPokemon) {
      this.listaMostrados = this.listaPokemon.filter((pokemon) => {
        return pokemon.types.some((tipo) => tipo.type.name == type);
      });
    }
  }
  getColorFondo(tipo: string): any {
    switch (tipo) {
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
  getColorDecoracion(tipo: string): any {
    switch (tipo) {
      case 'grass':
        return { fill: '#62B957' };
      case 'fire':
        return { fill: '#FD7D24' };
      case 'water':
        return { fill: '#4A90DA' };
      case 'bug':
        return { fill: '#8CB230' };
      case 'normal':
        return { fill: '#9DA0AA' };
      case 'poison':
        return { fill: '#A552CC' };
      case 'electric':
        return { fill: '#F2D94E' };
      case 'ground':
        return { fill: '#F78551' };
      case 'fairy':
        return { fill: '#ED6EC7' };
      case 'fighting':
        return { fill: '#D04164' };
      case 'psychic':
        return { fill: '#EA5D60' };
      case 'rock':
        return { fill: '#BAAB82' };
      case 'ghost':
        return { fill: '#5F6DBC' };
      case 'ice':
        return { fill: '#91D8DF' };
      case 'dragon':
        return { fill: '#0C69C8' };
      case 'dark':
        return { fill: '#595761' };
      case 'steel':
        return { fill: '#417D9A' };
      case 'flying':
        return { fill: '#748FC9' };
      default:
        return { fill: 'white' };
    }
  }
  getColorTipo(tipo: string) {
    switch (tipo) {
      case 'grass':
        return { '--background': '#62B957' };
      case 'fire':
        return { '--background': '#FD7D24' };
      case 'water':
        return { '--background': '#4A90DA' };
      case 'bug':
        return { '--background': '#8CB230' };
      case 'normal':
        return { '--background': '#9DA0AA' };
      case 'poison':
        return { '--background': '#A552CC' };
      case 'electric':
        return { '--background': '#F2D94E' };
      case 'ground':
        return { '--background': '#F78551' };
      case 'fairy':
        return { '--background': '#ED6EC7' };
      case 'fighting':
        return { '--background': '#D04164' };
      case 'psychic':
        return { '--background': '#EA5D60' };
      case 'rock':
        return { '--background': '#BAAB82' };
      case 'ghost':
        return { '--background': '#5F6DBC' };
      case 'ice':
        return { '--background': '#91D8DF' };
      case 'dragon':
        return { '--background': '#0C69C8' };
      case 'dark':
        return { '--background': '#595761' };
      case 'steel':
        return { '--background': '#417D9A' };
      case 'flying':
        return { '--background': '#748FC9' };
      default:
        return { '--background': 'white' };
    }
  }

  rangeChange(event: any) {
    console.log(event.detail);
    this.api
      .getListaPokemonPorEvento(event)
      .pipe(
        switchMap((data) => {
          this.pokedex = data;
          this.pokedexResults = data.results;
          return forkJoin(
            data.results.map((pokemon) => {
              return this.api.getPokemonIndividual(pokemon.url);
            })
          );
        })
      )
      .subscribe((data) => {
        this.listaPokemon = data;
        this.listaMostrados = this.listaPokemon;
        this.loading = false;
      });
  }
  cancel() {
    this.filtrosSet.clear();
  }
  confirm() {
    this.aplicarFiltros();
  }
  minNumberSort = false;
  maxNumberSort = false;
  azSort = false;
  zaSort = false;
  saludar() {
    alert('Hola');
  }

  GenerationI = false;
  GenerationII = false;
  GenerationIII = false;
  GenerationIV = false;
  GenerationV = false;
  GenerationVI = false;
  GenerationVII = false;
  GenerationVIII = false;

  cancelarGeneraciones() {
    this.GenerationI = false;
    this.GenerationII = false;
    this.GenerationIII = false;
    this.GenerationIV = false;
    this.GenerationV = false;
    this.GenerationVI = false;
    this.GenerationVII = false;
    this.GenerationVIII = false;
  }
  sortByGeneration(gen: number) {
    this.cancelarGeneraciones();
    if (this.listaMostrados == null) {
      console.log('ListaMostrados vacio');
      return;
    }
    if (this.listaPokemon == null) {
      console.log('ListaPokemon vacio');
      return;
    }
    switch (gen) {
      case 1:
        this.GenerationI = true;
        this.filtradoPorgeneracion(0, 151);
        break;
      case 2:
        this.GenerationII = true;
        this.filtradoPorgeneracion(151, 251);
        break;
      case 3:
        this.GenerationIII = true;
        this.filtradoPorgeneracion(251, 386);
        break;
      case 4:
        this.GenerationIV = true;
        this.filtradoPorgeneracion(386, 493);
        break;
      case 5:
        this.GenerationV = true;
        this.filtradoPorgeneracion(493, 650);
        break;
      case 6:
        this.GenerationVI = true;
        this.filtradoPorgeneracion(650, 722);
        break;
      case 7:
        this.GenerationVII = true;
        this.filtradoPorgeneracion(722, 809);
        break;
      case 8:
        this.GenerationVIII = true;
        this.filtradoPorgeneracion(809, 1073);
        break;
    }
  }
  filtradoPorgeneracion(gen: number, max: number) {
    this.loading = true;
    this.api
      .getListaPokemonPorEvento2(gen, max)
      .pipe(
        switchMap((data) => {
          this.pokedex = data;
          this.pokedexResults = data.results;
          return forkJoin(
            data.results.map((pokemon) => {
              return this.api.getPokemonIndividual(pokemon.url);
            })
          );
        })
      )
      .subscribe((data) => {
        this.listaPokemon = data;
        this.listaMostrados = this.listaPokemon;
        this.loading = false;
      });
  }
  sort(tipoFiltro: string) {
    if (this.listaMostrados == null) {
      console.log('ListaMostrados vacio');
      return;
    }
    switch (tipoFiltro) {
      case 'minNumber':
        this.listaMostrados.sort((a, b) => a.id - b.id);
        this.minNumberSort = true;
        this.maxNumberSort = false;
        this.azSort = false;
        this.zaSort = false;
        break;
      case 'maxNumber':
        this.listaMostrados.sort((a, b) => b.id - a.id);
        this.minNumberSort = false;
        this.maxNumberSort = true;
        this.azSort = false;
        this.zaSort = false;
        break;
      case 'AZ':
        this.listaMostrados.sort((a, b) => a.name.localeCompare(b.name));
        this.minNumberSort = false;
        this.maxNumberSort = false;
        this.azSort = true;
        this.zaSort = false;
        break;
      case 'ZA':
        this.listaMostrados.sort((a, b) => b.name.localeCompare(a.name));
        this.minNumberSort = false;
        this.maxNumberSort = false;
        this.azSort = false;
        this.zaSort = true;
        break;
    }
  }
  aplicarFiltros() {
    if (this.filtrosSet.size == 0) {
      console.log('FiltroSet vacio');
      this.listaMostrados = this.listaPokemon;
      return;
    }
    if (this.listaPokemon == null) {
      console.log('ListaPokemon vacio');
      return;
    }
    this.listaMostrados = this.listaPokemon.filter((pokemon) => {
      let tipos = pokemon.types.map((tipo) => tipo.type.name);
      let resultado = tipos.filter((tipo) => this.filtrosSet.has(tipo));
      return resultado.length > 0;
    });
    if (this.filtrosSet.has('light')) {
      this.listaMostrados = this.listaPokemon.filter((pokemon) => {
        return pokemon.weight < 100;
      });
    } else if (this.filtrosSet.has('heavy')) {
      this.listaMostrados = this.listaPokemon.filter((pokemon) => {
        return pokemon.weight > 200;
      });
    } else if (this.filtrosSet.has('medium')) {
      this.listaMostrados = this.listaPokemon.filter((pokemon) => {
        return pokemon.weight >= 100 && pokemon.weight <= 200;
      });
    }
    if (this.filtrosSet.has('short')) {
      this.listaMostrados = this.listaPokemon.filter((pokemon) => {
        return pokemon.height < 5;
      });
    } else if (this.filtrosSet.has('tall')) {
      this.listaMostrados = this.listaPokemon.filter((pokemon) => {
        return pokemon.height > 20;
      });
    } else if (this.filtrosSet.has('normalsize')) {
      this.listaMostrados = this.listaPokemon.filter((pokemon) => {
        return pokemon.height >= 5 && pokemon.height <= 20;
      });
    }
    console.log(this.listaMostrados);
  }
  filterByHeight(minHeight: number, maxHeight: number): void {
    if (this.listaPokemon) {
      this.listaMostrados = this.listaPokemon.filter(
        (pokemon) => pokemon.height >= minHeight && pokemon.height <= maxHeight
      );
    }
  }
  toggleChangedWeakness(event: any, tipo: string) {
    switch(tipo) {
      case 'grass':
        this.filtrosSet.add('water');
        this.filtrosSet.add('ground');
        this.filtrosSet.add('rock');
        this.filtrosSet.add('ground');
        break;
      case 'fire':
        this.filtrosSet.add('grass');
        this.filtrosSet.add('ice');
        this.filtrosSet.add('bug');
        break;
      case 'water':
        this.filtrosSet.add('fire');
        this.filtrosSet.add('ground');
        this.filtrosSet.add('rock');
        break;
      case 'electric':
        this.filtrosSet.add('water');
        this.filtrosSet.add('flying');
        break;
      case 'rock':
        this.filtrosSet.add('fire');
        this.filtrosSet.add('ice');
        this.filtrosSet.add('flying');
        this.filtrosSet.add('bug');
        break;
      case 'ground':
        this.filtrosSet.add('water');
        this.filtrosSet.add('grass');
        this.filtrosSet.add('ice');
        break;
      case 'flying':
        this.filtrosSet.add('grass');
        this.filtrosSet.add('fighting');
        this.filtrosSet.add('bug');
        break;
      case 'fighting':
        this.filtrosSet.add('rock');
        this.filtrosSet.add('ice');
        this.filtrosSet.add('normal');
        break;
      case 'ice':
        this.filtrosSet.add('grass');
        this.filtrosSet.add('ground');
        this.filtrosSet.add('flying');
        this.filtrosSet.add('dragon');
        break;
      case 'bug':
        this.filtrosSet.add('grass');
        this.filtrosSet.add('psychic');
        this.filtrosSet.add('dark');
        break;
      case 'poison':
        this.filtrosSet.add('grass');
        this.filtrosSet.add('fairy');
        break;
      case 'psychic':
        this.filtrosSet.add('fighting');
        this.filtrosSet.add('poison');
        break;
      case 'ghost':
        this.filtrosSet.add('psychic');
        this.filtrosSet.add('ghost');
        break;
      case 'dark':
        this.filtrosSet.add('psychic');
        this.filtrosSet.add('ghost');
        break;
      case 'steel':
        this.filtrosSet.add('ice');
        this.filtrosSet.add('rock');
        this.filtrosSet.add('fairy');
        break;
      case 'fairy':
        this.filtrosSet.add('fighting');
        this.filtrosSet.add('dragon');
        this.filtrosSet.add('dark');
        break;
      default:
        console.log('Tipo no reconocido');
        break;
    }
    // switch (tipo) {
    //   case 'grass':
    //     this.filtrosSet.add('fire');
    //     this.filtrosSet.add('ice');
    //     this.filtrosSet.add('poison');
    //     this.filtrosSet.add('flying');
    //     this.filtrosSet.add('bug');
    //     break;
    //   case 'fire':
    //     this.filtrosSet.add('water');
    //     this.filtrosSet.add('ground');
    //     this.filtrosSet.add('rock');
    //     break;
    //   case 'water':
    //     this.filtrosSet.add('electric');
    //     this.filtrosSet.add('grass');
    //     break;
    //   case 'bug':
    //     this.filtrosSet.add('fire');
    //     this.filtrosSet.add('flying');
    //     this.filtrosSet.add('rock');
    //     break;
    //   case 'normal':
    //     this.filtrosSet.add('fighting');
    //     break;
    //   case 'poison':
    //     this.filtrosSet.add('ground');
    //     this.filtrosSet.add('psychic');
    //     break;
    //   case 'electric':
    //     this.filtrosSet.add('ground');
    //     break;
    //   case 'ground':
    //     this.filtrosSet.add('water');
    //     this.filtrosSet.add('grass');
    //     this.filtrosSet.add('ice');
    //     break;
    //   case 'fairy':
    //     this.filtrosSet.add('poison');
    //     this.filtrosSet.add('steel');
    //     break;
    //   case 'fighting':
    //     this.filtrosSet.add('flying');
    //     this.filtrosSet.add('psychic');
    //     this.filtrosSet.add('fairy');
    //     break;
    //   case 'psychic':
    //     this.filtrosSet.add('bug');
    //     this.filtrosSet.add('ghost');
    //     this.filtrosSet.add('dark');
    //     break;
    //   case 'flying':
    //     this.filtrosSet.add('electric');
    //     this.filtrosSet.add('ice');
    //     this.filtrosSet.add('rock');
    //     break;
    //   case 'rock':
    //     this.filtrosSet.add('fighting');
    //     this.filtrosSet.add('ground');
    //     this.filtrosSet.add('steel');
    //     this.filtrosSet.add('water');
    //     this.filtrosSet.add('grass');
    //     break;
    //   case 'ghost':
    //     this.filtrosSet.add('ghost');
    //     this.filtrosSet.add('dark');
    //     break;
    //   case 'ice':
    //     this.filtrosSet.add('fighting');
    //     this.filtrosSet.add('rock');
    //     this.filtrosSet.add('steel');
    //     this.filtrosSet.add('fire');
    //     break;
    //   case 'dragon':
    //     this.filtrosSet.add('ice');
    //     this.filtrosSet.add('dragon');
    //     this.filtrosSet.add('fairy');
    //     break;
    //   case 'dark':
    //     this.filtrosSet.add('fighting');
    //     this.filtrosSet.add('bug');
    //     this.filtrosSet.add('fairy');
    //     break;
    //   case 'steel':
    //     this.filtrosSet.add('fighting');
    //     this.filtrosSet.add('ground');
    //     this.filtrosSet.add('fire');
    //     break;
    //   default:
    //     break;
    // }
  }
  filterByWeight(minWeight: number, maxWeight: number): void {
    if (this.listaPokemon) {
      this.listaMostrados = this.listaPokemon.filter(
        (pokemon) => pokemon.weight >= minWeight && pokemon.weight <= maxWeight
      );
    }
  }

  onSearchChange(event: any) {
    if (this.listaPokemon) {
      this.listaMostrados = this.listaPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(event.detail.value.toLowerCase())
      );
    }
  }

  checkPeso(tipoPokemon: string) {
    switch (tipoPokemon) {
      case 'light':
        this.filtrosSet.delete('medium');
        this.filtrosSet.delete('heavy');
        break;
      case 'medium':
        this.filtrosSet.delete('light');
        this.filtrosSet.delete('heavy');
        break;
      case 'heavy':
        this.filtrosSet.delete('light');
        this.filtrosSet.delete('medium');
        break;
    }
  }
  checkAltura(tipoPokemon: string) {
    switch (tipoPokemon) {
      case 'short':
        this.filtrosSet.delete('normalsize');
        this.filtrosSet.delete('tall');
        break;
      case 'normalsize':
        this.filtrosSet.delete('short');
        this.filtrosSet.delete('tall');
        break;
      case 'tall':
        this.filtrosSet.delete('short');
        this.filtrosSet.delete('normalsize');
        break;
    }
  }
  toggleChanged(event: any, tipoPokemon: string) {
    if (this.filtrosSet.has(tipoPokemon)) {
      this.filtrosSet.delete(tipoPokemon);
    } else {
      this.checkPeso(tipoPokemon);
      this.checkAltura(tipoPokemon);
      this.filtrosSet.add(tipoPokemon);
    }
    console.log(this.filtrosSet);
  }
  segmentChanged(event: any) {
    console.log('Selected segment:', event.detail.value);
  }
}
/*
  if (
      tipoPokemon == 'light' ||
      tipoPokemon == 'medium' ||
      tipoPokemon == 'heavy'
    ) {
      if (event.detail.checked == false) {
        this.listaMostrados = this.listaPokemon;
        this.filtrosSet.delete(tipoPokemon);
        console.log(this.filtrosSet);
      } else {
        this.filtrosSet.add(tipoPokemon);
        if (this.listaPokemon) {
          switch (tipoPokemon) {
            case 'light':
              this.filterByWeight(0, 100);
              break;
            case 'medium':
              this.filterByWeight(100, 200);
              break;
            case 'heavy':
              this.filterByWeight(200, Infinity);
              break;
          }
        }
        console.log(this.filtrosSet);
      }
      return;
    }
    if (
      tipoPokemon == 'short' ||
      tipoPokemon == 'normalsize' ||
      tipoPokemon == 'tall'
    ) {
      if (event.detail.checked == false) {
        this.listaMostrados = this.listaPokemon;
        this.filtrosSet.delete(tipoPokemon);
        console.log(this.filtrosSet);
      } else {
        this.filtrosSet.add(tipoPokemon);
        if (this.listaPokemon) {
          switch (tipoPokemon) {
            case 'short':
              this.filterByHeight(0, 10);
              break;
            case 'normalsize':
              this.filterByHeight(11, 19);
              break;
            case 'tall':
              this.filterByHeight(20, Infinity);
              break;
          }
        }
        console.log(this.filtrosSet);
      }
      return;
    }
    if (event.detail.checked == false) {
      this.listaMostrados = this.listaPokemon;
      this.filtrosSet.delete(tipoPokemon);
      console.log(this.filtrosSet);
    } else {
      this.filtrosSet.add(tipoPokemon);
      if (this.listaPokemon) {
        this.listaMostrados = this.listaPokemon.filter((pokemon) => {
          if (this.filtrosSet.has('light')) {
            if (this.filtrosSet.has('short')) {
              return (
                pokemon.types.some((tipo) =>
                  this.filtrosSet.has(tipo.type.name)
                ) &&
                pokemon.weight <= 100 &&
                pokemon.height <= 10
              );
            } else if (this.filtrosSet.has('normalsize')) {
              return (
                pokemon.types.some((tipo) =>
                  this.filtrosSet.has(tipo.type.name)
                ) &&
                pokemon.weight <= 100 &&
                pokemon.height > 10 &&
                pokemon.height < 20
              );
            } else if (this.filtrosSet.has('tall')) {
              return (
                pokemon.types.some((tipo) =>
                  this.filtrosSet.has(tipo.type.name)
                ) &&
                pokemon.weight <= 100 &&
                pokemon.height >= 20
              );
            } else {
              return (
                pokemon.types.some((tipo) =>
                  this.filtrosSet.has(tipo.type.name)
                ) && pokemon.weight <= 100
              );
            }
          } else if (this.filtrosSet.has('medium')) {
            if (this.filtrosSet.has('short')) {
              return (
                pokemon.types.some((tipo) =>
                  this.filtrosSet.has(tipo.type.name)
                ) &&
                pokemon.weight > 100 &&
                pokemon.weight < 200 &&
                pokemon.height <= 10
              );
            } else if (this.filtrosSet.has('normalsize')) {
              return (
                pokemon.types.some((tipo) =>
                  this.filtrosSet.has(tipo.type.name)
                ) &&
                pokemon.weight > 100 &&
                pokemon.weight < 200 &&
                pokemon.height > 10 &&
                pokemon.height < 20
              );
            } else if (this.filtrosSet.has('tall')) {
              return (
                pokemon.types.some((tipo) =>
                  this.filtrosSet.has(tipo.type.name)
                ) &&
                pokemon.weight > 100 &&
                pokemon.weight < 200 &&
                pokemon.height >= 20
              );
            } else {
              return (
                pokemon.types.some((tipo) =>
                  this.filtrosSet.has(tipo.type.name)
                ) &&
                pokemon.weight > 100 &&
                pokemon.weight < 200
              );
            }
          } else if (this.filtrosSet.has('heavy')) {
            if (this.filtrosSet.has('short')) {
              return (
                pokemon.types.some((tipo) =>
                  this.filtrosSet.has(tipo.type.name)
                ) &&
                pokemon.weight >= 200 &&
                pokemon.height <= 10
              );
            } else if (this.filtrosSet.has('normalsize')) {
              return (
                pokemon.types.some((tipo) =>
                  this.filtrosSet.has(tipo.type.name)
                ) &&
                pokemon.weight >= 200 &&
                pokemon.height > 10 &&
                pokemon.height < 20
              );
            } else if (this.filtrosSet.has('tall')) {
              return (
                pokemon.types.some((tipo) =>
                  this.filtrosSet.has(tipo.type.name)
                ) &&
                pokemon.weight >= 200 &&
                pokemon.height >= 20
              );
            } else {
              return (
                pokemon.types.some((tipo) =>
                  this.filtrosSet.has(tipo.type.name)
                ) && pokemon.weight >= 200
              );
            }
          } else {
            return pokemon.types.some((tipo) =>
              this.filtrosSet.has(tipo.type.name)
            ); // Devuelve un valor predeterminado en caso de que ninguna de las condiciones se cumpla
          }
        });

        if (this.filtrosSet.has('short')) {
          this.listaMostrados = this.listaPokemon.filter((pokemon) => {
            return (
              pokemon.types.some((tipo) =>
                this.filtrosSet.has(tipo.type.name)
              ) && pokemon.height <= 10
            );
          });
        } else if (this.filtrosSet.has('normalsize')) {
          this.listaMostrados = this.listaPokemon.filter((pokemon) => {
            return (
              pokemon.types.some((tipo) =>
                this.filtrosSet.has(tipo.type.name)
              ) &&
              pokemon.height > 10 &&
              pokemon.height < 20
            );
          });
        } else if (this.filtrosSet.has('tall')) {
          this.listaMostrados = this.listaPokemon.filter((pokemon) => {
            return (
              pokemon.types.some((tipo) =>
                this.filtrosSet.has(tipo.type.name)
              ) && pokemon.height >= 20
            );
          });
        }
      }
      console.log(this.filtrosSet);
    }
*/
