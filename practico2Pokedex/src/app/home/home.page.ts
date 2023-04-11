import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PokeApiService } from '../services/poke-api.service';
import { HttpClientModule } from '@angular/common/http';
import { Pokedex, Result } from '../models/Pokedex';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../models/Pokemon';
import { forkJoin, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { ModalsModule } from '../components/modals/modals.module';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    HttpClientModule,
    ModalsModule],
  providers: [PokeApiService],
})
export class HomePage {
  pokedex: Pokedex | null = null;

  pokedexTipos : Pokedex | null = null;

  pokedexResults: Result[] | null = null;
  listaPokemon: Pokemon[] | null = null;
  listaMostrados: Pokemon[] | null = null;
  loading: Boolean = true;

  tiposPokemon : string[] = [];
  /////////////////////////////MODAL SORT

  ///////////////////////////////////

  filtrosSet : Set<String> = new Set<String>();
  filtrosSetDebilidades : Set<String> = new Set<String>();
  constructor(private api: PokeApiService, private router: Router) {
    api
      .getListaPokemon()
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
    api.getTiposDePokemon().subscribe((data : Pokedex) => {
        data.results.forEach(element => {
          this.tiposPokemon.push(element.name);
        });
        console.log(this.tiposPokemon);
      }
    
    );
  }
  pokemonDetalle(id: number) {
    this.router.navigate(['/pokemon-detalle', id]);
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
  
  toggleChanged(event: any, tipoPokemon: string) {
    if(tipoPokemon=="light"||tipoPokemon=="medium"||tipoPokemon=="heavy"){
      if (event.detail.checked == false) {
        this.listaMostrados = this.listaPokemon;
        this.filtrosSet.delete(tipoPokemon);
        console.log(this.filtrosSet);
      } else {
        this.filtrosSet.add(tipoPokemon);
        if (this.listaPokemon) {
        switch (tipoPokemon) {
          case "light":
            this.listaMostrados = this.listaPokemon.filter((pokemon) => {
              return pokemon.weight <= 100;
            }
            );
            break;
          case "medium":
            this.listaMostrados = this.listaPokemon.filter((pokemon) => {
              return pokemon.weight > 100 && pokemon.weight < 200;
            }
            );
            break;
          case "heavy":
            this.listaMostrados = this.listaPokemon.filter((pokemon) => {
              return pokemon.weight >= 200;
            }
            );
        }
          
        }
        console.log(this.filtrosSet);
      }
      return;
    }
    if(tipoPokemon=="short"||tipoPokemon=="normalsize"||tipoPokemon=="tall"){
      if (event.detail.checked == false) {
        this.listaMostrados = this.listaPokemon;
        this.filtrosSet.delete(tipoPokemon);
        console.log(this.filtrosSet);
      } else {
        this.filtrosSet.add(tipoPokemon);
        if (this.listaPokemon) {
        switch (tipoPokemon) {
          case "short":
            this.listaMostrados = this.listaPokemon.filter((pokemon) => {
              return pokemon.height <= 10;
            }
            );
            break;
          case "normalsize":
            this.listaMostrados = this.listaPokemon.filter((pokemon) => {
              return pokemon.height > 10 && pokemon.height < 20;
            }
            );
            break;
          case "tall":
            this.listaMostrados = this.listaPokemon.filter((pokemon) => {
              return pokemon.height >= 20;
            }
            );
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
          if(this.filtrosSet.has('light')){
            if(this.filtrosSet.has('short')){
              return pokemon.types.some((tipo) => this.filtrosSet.has(tipo.type.name)) && pokemon.weight <= 100 && pokemon.height <= 10;
            } else if(this.filtrosSet.has('normalsize')){
              return pokemon.types.some((tipo) => this.filtrosSet.has(tipo.type.name)) && pokemon.weight <= 100 && pokemon.height > 10 && pokemon.height < 20;
            } else if(this.filtrosSet.has('tall')){
              return pokemon.types.some((tipo) => this.filtrosSet.has(tipo.type.name)) && pokemon.weight <= 100 && pokemon.height >= 20;
            } else {
            return pokemon.types.some((tipo) => this.filtrosSet.has(tipo.type.name)) && pokemon.weight <= 100;
            }
          } else if(this.filtrosSet.has('medium')){
            if(this.filtrosSet.has('short')){
              return pokemon.types.some((tipo) => this.filtrosSet.has(tipo.type.name)) && pokemon.weight > 100 && pokemon.weight < 200 && pokemon.height <= 10;
            } else if(this.filtrosSet.has('normalsize')){
              return pokemon.types.some((tipo) => this.filtrosSet.has(tipo.type.name)) && pokemon.weight > 100 && pokemon.weight < 200 && pokemon.height > 10 && pokemon.height < 20;
            } else if(this.filtrosSet.has('tall')){
              return pokemon.types.some((tipo) => this.filtrosSet.has(tipo.type.name)) && pokemon.weight > 100 && pokemon.weight < 200 && pokemon.height >= 20;
            } else {
            return pokemon.types.some((tipo) => this.filtrosSet.has(tipo.type.name)) && pokemon.weight > 100 && pokemon.weight < 200;
            }
          } else if(this.filtrosSet.has('heavy')){
            if(this.filtrosSet.has('short')){
              return pokemon.types.some((tipo) => this.filtrosSet.has(tipo.type.name)) && pokemon.weight >= 200 && pokemon.height <= 10;
            } else if(this.filtrosSet.has('normalsize')){
              return pokemon.types.some((tipo) => this.filtrosSet.has(tipo.type.name)) && pokemon.weight >= 200 && pokemon.height > 10 && pokemon.height < 20;
            } else if(this.filtrosSet.has('tall')){
              return pokemon.types.some((tipo) => this.filtrosSet.has(tipo.type.name)) && pokemon.weight >= 200 && pokemon.height >= 20;
            } else {
            return pokemon.types.some((tipo) => this.filtrosSet.has(tipo.type.name)) && pokemon.weight >= 200;
            }
          } else {
            return pokemon.types.some((tipo) => this.filtrosSet.has(tipo.type.name)); // Devuelve un valor predeterminado en caso de que ninguna de las condiciones se cumpla
          }
        });
       
        if(this.filtrosSet.has('short')){
          this.listaMostrados = this.listaPokemon.filter((pokemon) => {
            return pokemon.types.some((tipo) =>
              this.filtrosSet.has(tipo.type.name)
            ) && pokemon.height <= 10;
          });
        }else if(this.filtrosSet.has('normalsize')){
          this.listaMostrados = this.listaPokemon.filter((pokemon) => {
            return pokemon.types.some((tipo) =>
              this.filtrosSet.has(tipo.type.name)
            ) && pokemon.height > 10 && pokemon.height < 20;
          });
        }else if(this.filtrosSet.has('tall')){
          this.listaMostrados = this.listaPokemon.filter((pokemon) => {
            return pokemon.types.some((tipo) =>
              this.filtrosSet.has(tipo.type.name)
            ) && pokemon.height >= 20;
          });
        }
      }
      console.log(this.filtrosSet);
    }
  }
}
