import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonImg, IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { HttpClientModule } from '@angular/common/http';
import { Pokemon } from 'src/app/models/Pokemon';
import { ModalsModule } from 'src/app/components/modals/modals.module';
import { Species } from 'src/app/models/Species';
import { Pokedex } from 'src/app/models/Pokedex';

@Component({
  selector: 'app-pokemon-detalle',
  templateUrl: './pokemon-detalle.page.html',
  styleUrls: ['./pokemon-detalle.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, ModalsModule],
  providers: [PokeApiService],
})
export class PokemonDetallePage implements OnInit {
  loading : boolean = true;
  pokemon? : Pokemon;
  paginaAbout : boolean = true;
  paginaStats : boolean = false;
  paginaEvoluciones : boolean = false;
  especiePokemon? : Species;
  tiposPokemon? : Pokedex;
  constructor(private route : ActivatedRoute, private api : PokeApiService) { 
    this.getPokemon(this.route.snapshot.params['id']);
    this.getEspeciePokemon(this.route.snapshot.params['id']);
    this.getTiposPokemon();
  }
  getTiposPokemon(){
    this.api.getTiposDePokemon().subscribe(data => {
      this.tiposPokemon = data;
    });

  }

  getEspeciePokemon(id : number){
    this.api.getPokemonPorEspecies(id).subscribe(data => {
      this.especiePokemon = data;
    });
  }
  getPokemon(int : number){
    this.api.getPokemonIndividualDetallado(int).subscribe(data => {
      this.pokemon = data;
      this.loading = false;
    });
  }

  toggle(topic : string){
    switch(topic){
      case 'about':
        this.paginaAbout = true;
        this.paginaStats = false;
        this.paginaEvoluciones = false;
        break;
      case 'stats':
        this.paginaAbout = false;
        this.paginaStats = true;
        this.paginaEvoluciones = false;
        break;
      case 'evolution':
        this.paginaAbout = false;
        this.paginaStats = false;
        this.paginaEvoluciones = true;
        break;
  }
  }

  ngOnInit() {
  }
  getColor(tipo: string) {
    switch (tipo) {
      case 'grass':
        return '#62B957';
      case 'fire':
        return '#FD7D24';
      case 'water':
        return '#4A90DA';
      case 'bug':
        return '#8CB230';
      case 'normal':
        return '#9DA0AA';
      case 'poison':
        return '#A552CC';
      case 'electric':
        return '#F2D94E';
      case 'ground':
        return '#F78551';
      case 'fairy':
        return '#ED6EC7';
      case 'fighting':
        return '#D04164';
      case 'psychic':
        return '#EA5D60';
      case 'rock':
        return '#BAAB82';
      case 'ghost':
        return '#5F6DBC';
      case 'ice':
        return '#91D8DF';
      case 'dragon':
        return '#0C69C8';
      case 'dark':
        return '#595761';
      case 'steel':
        return '#417D9A';
      case 'flying':
        return '#748FC9';
      default:
        return 'white';
    }
}
  getColorTipo(tipo: string) {
    switch (tipo) {
      case 'grass':
        return { 'background-color': '#62B957' };
      case 'fire':
        return { 'background-color': '#FD7D24' };
      case 'water':
        return { 'background-color': '#4A90DA' };
      case 'bug':
        return { 'background-color': '#8CB230' };
      case 'normal':
        return { 'background-color': '#9DA0AA' };
      case 'poison':
        return { 'background-color': '#A552CC' };
      case 'electric':
        return { 'background-color': '#F2D94E' };
      case 'ground':
        return { 'background-color': '#F78551' };
      case 'fairy':
        return { 'background-color': '#ED6EC7' };
      case 'fighting':
        return { 'background-color': '#D04164' };
      case 'psychic':
        return { 'background-color': '#EA5D60' };
      case 'rock':
        return { 'background-color': '#BAAB82' };
      case 'ghost':
        return { 'background-color': '#5F6DBC' };
      case 'ice':
        return { 'background-color': '#91D8DF' };
      case 'dragon':
        return { 'background-color': '#0C69C8' };
      case 'dark':
        return { 'background-color': '#595761' };
      case 'steel':
        return { 'background-color': '#417D9A' };
      case 'flying':
        return { 'background-color': '#748FC9' };
      default:
        return { 'background-color': 'white' };
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
  getColorToolbar(tipo : string){
    switch (tipo) {
      case 'grass':
        return { '--background': 'rgb(139,190,138)' };
      case 'fire':
        return { '--background': 'rgb(255,167,86)' };
      case 'water':
        return { '--background': 'rgb(88,171,246)' };
      case 'bug':
        return { '--background': 'rgb(139,214,116)' };
      case 'normal':
        return { '--background': 'rgb(181,185,196)' };
      case 'poison':
        return { '--background': 'rgb(159,110,151)' };
      case 'electric':
        return { '--background': 'rgb(242,203,85)' };
      case 'ground':
        return { '--background': 'rgb(247,133,81)' };
      case 'fairy':
        return { '--background': 'rgb(235,168,195)' };
      case 'fighting':
        return { '--background': 'rgb(235,73,113)' };
      case 'psychic':
        return { '--background': 'rgb(255,101,104)' };
      case 'rock':
        return { '--background': 'rgb(212,194,148)' };
      case 'ghost':
        return { '--background': 'rgb(133,112,190)' };
      case 'ice':
        return { '--background': 'rgb(145,216,223)' };
      case 'dragon':
        return { '--background': 'rgb(115,131,185)' };
      case 'dark':
        return { '--background': 'rgb(111,110,120)' };
      case 'steel':
        return { '--background': 'rgb(76,145,178)' };
      case 'flying':
        return { '--background': 'rgb(131,162,227)' };
      default:
        return { '--background': 'white' };
    }
  }
  getPinturaFondo(tipo : string, deg : number, porcentaje : number){
    switch (tipo) {
      case 'grass':
        return {
         'background': 'linear-gradient('+deg+'deg, rgb(139, 190, 138) '+porcentaje+'%, rgba(139, 190, 138, 0.43) 100%)'
        };
  case 'fire':
    return {
      'background': 'linear-gradient('+deg+'deg, rgb(255, 167, 86) '+porcentaje+'%, rgba(255, 167, 86, 0.43) 100%)'
    };
  case 'water':
    return {
      'background': 'linear-gradient('+deg+'deg, rgb(88, 171, 246) '+porcentaje+'%, rgba(88, 171, 246, 0.43) 100%)'
    };
  case 'bug':
    return {
      'background': 'linear-gradient('+deg+'deg, rgb(139, 214, 116) '+porcentaje+'%, rgba(139, 214, 116, 0.43) 100%)'
    };
  case 'normal':
    return {
      'background': 'linear-gradient('+deg+'deg, rgb(181, 185, 196) '+porcentaje+'%, rgba(181, 185, 196, 0.43) 100%)'
    };
  case 'poison':
    return {
      'background': 'linear-gradient('+deg+'deg, rgb(159, 110, 151) '+porcentaje+'%, rgba(159, 110, 151, 0.43) 100%)'
    };
  case 'electric':
    return {
      'background': 'linear-gradient('+deg+'deg, rgb(242, 203, 85) '+porcentaje+'%, rgba(242, 203, 85, 0.43) 100%)'
    };
  case 'ground':
    return {
      'background': 'linear-gradient('+deg+'deg, rgb(247, 133, 81) '+porcentaje+'%, rgba(247, 133, 81, 0.43) 100%)'
    };
  case 'fairy':
    return {
      'background': 'linear-gradient('+deg+'deg, rgb(235, 168, 195) '+porcentaje+'%, rgba(235, 168, 195, 0.43) 100%)'
    };
  case 'fighting':
    return {
      'background': 'linear-gradient('+deg+'deg, rgb(235, 73, 113) '+porcentaje+'%, rgba(235, 73, 113, 0.43) 100%)'
    };
  case 'psychic':
    return {
      'background': 'linear-gradient('+deg+'deg, rgb(255, 101, 104) '+porcentaje+'%, rgba(255, 101, 104, 0.43) 100%)'
    };
  case 'rock':
    return {
      'background': 'linear-gradient('+deg+'deg, rgb(212, 194, 148) '+porcentaje+'%, rgba(212, 194, 148, 0.43) 100%)'
    };
  case 'ghost':
    return {
      'background': 'linear-gradient('+deg+'deg, rgb(133, 112, 190) '+porcentaje+'%, rgba(133, 112, 190, 0.43) 100%)'
    };
  case 'ice':
    return {
      'background': 'linear-gradient('+deg+'deg, rgb(145, 216, 223) '+porcentaje+'%, rgba(145, 216, 223, 0.43) 100%)'
    }
  case 'dragon':
    return {
    'background': 'linear-gradient('+deg+'deg, rgb(115, 131, 185) '+porcentaje+'%, rgba(115, 131, 185, 0.43) 100%)'
    };
case 'dark':
  return {
    'background': 'linear-gradient('+deg+'deg, rgb(111, 110, 120) '+porcentaje+'%, rgba(111, 110, 120, 0.43) 100%)'
  };
case 'steel':
  return {
    'background': 'linear-gradient('+deg+'deg, rgb(76, 145, 178) '+porcentaje+'%, rgba(76, 145, 178, 0.43) 100%)'
  };
case 'flying':
  return {
    'background': 'linear-gradient('+deg+'deg, rgb(131, 162, 227) '+porcentaje+'%, rgba(131, 162, 227, 0.43) 100%)'
  };
default:
  return {
    'background': 'linear-gradient(0deg, white 50%, rgba(255, 255, 255, 0.43) 100%)'
  };
}}
  handlePokemonClick(pokemon: Pokemon) {
    console.log(`Se ha hecho clic en ${pokemon.name}`);
  }


}
