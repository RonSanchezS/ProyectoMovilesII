import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';
import { Species } from 'src/app/models/Species';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  @Input()
  id!: number;

  @Input()
  pokemon!: Pokemon;

  @Input()
  especiePokemon!: Species;

  relacionesDeDmg: Set<string> = new Set();

  index: number = 0;
  numeroDeEntradasDeDescripcion: number = 0;
  numeroDeEntradasDeGenero: number = 0;
  numeroDePasosNecesarios : number = 0;
  EV_YIELD: string[] = [];
  GENDER_DIST: string[] = [];
  locationEncounters : string[] = [];




  ngOnChanges(changes: SimpleChanges) {
    if (changes['id'] && changes['id'].currentValue) {
      this.traerEspecies(changes['id'].currentValue);
    }
  }

  constructor(private api: PokeApiService) {}

  traerEspecies(id: number) {
    //get radio de generos
    this.obetenerRadioDeGeneros(this.especiePokemon.gender_rate);
    //get Pasos necesarios = (Hatch Counter + 1) x 255

    this.numeroDePasosNecesarios = (1+this.especiePokemon.hatch_counter) * 255;

    //get flavor_text_entries where the language is en or es
    this.especiePokemon.flavor_text_entries =
      this.especiePokemon.flavor_text_entries.filter((entry) => {
        return entry.language.name == 'es';
      });
    //get genus where the language is  es
    this.especiePokemon.genera = this.especiePokemon.genera.filter(
      (entry) => {
        return entry.language.name == 'es';
      }
    );

    //generate random values between 0 and flavor_text_entries.length
    this.numeroDeEntradasDeDescripcion = Math.floor(
      Math.random() * this.especiePokemon.flavor_text_entries.length
    );
    this.numeroDeEntradasDeGenero = Math.floor(
      Math.random() * this.especiePokemon.genera.length
    );
    this.pokemon.stats.forEach((element) => {
      if (element.effort > 0) {
        this.EV_YIELD.push(element.effort + ' ' + element.stat.name);
      }
    });
    //calcular el gender rate
  }
  obetenerRadioDeGeneros(int: number) {
    switch (int) {
      case 0:
        this.GENDER_DIST.push('Sin género');
        return;
      case 1:
        this.GENDER_DIST.push('100%');
        this.GENDER_DIST.push('male');
        this.GENDER_DIST.push('0%');
        this.GENDER_DIST.push('female');

        break;
      case 2:
        this.GENDER_DIST.push('87.5%');
        this.GENDER_DIST.push('male');

        this.GENDER_DIST.push('12.5%');
        this.GENDER_DIST.push('female');

        break;
      case 4:
        this.GENDER_DIST.push('50%');
        this.GENDER_DIST.push('male');

        this.GENDER_DIST.push('50%');
        this.GENDER_DIST.push('female');

        break;
      case 8:
        this.GENDER_DIST.push('0%');
        this.GENDER_DIST.push('male');

        this.GENDER_DIST.push('100%');
        this.GENDER_DIST.push('female');

        break;
      default:
        break;
    }
    
  }
  ngOnInit() {
    this.getTipoPokemon();
  }
  
  base_happiness : string = "";
  calcularBaseHappiness(){
    if(this.especiePokemon.base_happiness <= 5){
      this.base_happiness = "Muy Baja";
    }else if(this.especiePokemon.base_happiness < 15){
      this.base_happiness = "Baja";
    }else if(this.especiePokemon.base_happiness < 25){
      this.base_happiness = "Media";
    }else if(this.especiePokemon.base_happiness < 35){
      this.base_happiness = "Alta";
    }else{
      this.base_happiness = "Muy Alta";
    }

  }
  getTipoPokemon() {
    //set this.base_hapiness with a etiquette
    this.calcularBaseHappiness()
    let tiposPokemon = this.pokemon.types.map((tipo) => {
      return tipo.type.url;
    });
    //llamar a la api para traer los tipos de pokemon, pasando como parametro tiposPokemon
    //y guardarlos en un array

    tiposPokemon.forEach((element) => {
      this.api.getInformacionDeTipo(element).subscribe((data) => {
        data.damage_relations.double_damage_from.forEach((element) => {
          this.relacionesDeDmg.add(element.name);
        });
        //check for half damage
        data.damage_relations.half_damage_from.forEach((element) => {
          this.relacionesDeDmg.delete(element.name);
        });
      });
    });
  
  }

  @Input()
  colorTexto: string = '#FFF555';

  getColorTipo(){
    return { 'color': `${this.colorTexto}` };
  }

  getColorTipoFondo(tipo : string){
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

}
