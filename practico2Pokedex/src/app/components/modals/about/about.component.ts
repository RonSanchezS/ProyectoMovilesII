import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
  getTipoPokemon() {
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
}
