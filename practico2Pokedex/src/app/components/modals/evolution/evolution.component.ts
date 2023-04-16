import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Chain, EvolutionChainn } from 'src/app/models/EvolutionChain';
import { Pokemon } from 'src/app/models/Pokemon';
import { Species } from 'src/app/models/Species';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.scss'],
})
export class EvolutionComponent implements OnInit {
  @Input()
  especiePokemon!: Species;



  evoChain?: EvolutionChainn;

  primaryPokemon?: string;
  secondaryPokemon?: string;
  tertiaryPokemon?: string;

  isPokemonFetched: boolean = false;

  chain?: Chain;

  listaDeEvoluciones: Set<string> = new Set();
  
  listaPokemonDeEvoluciones : Set<Pokemon> = new Set();

  listaDePokemonConObjetos : Record<string, Pokemon> = {};


  constructor(private api: PokeApiService, private router : Router) {}

  ngOnInit() {
    this.getEvoChain();
    
  }

  onClick(){
    alert("Aasdasdasd");
  }

  traerPokemon(){
    if(!this.isPokemonFetched){
      this.listaDeEvoluciones.forEach(element => {
        this.api.getPokemonIndividualDetallado(element).subscribe((data) => {
          this.listaPokemonDeEvoluciones.add(data);
          });
      }
      );
    }
    this.isPokemonFetched = true;
    
  }
  getEvoChain() {
    this.api.getEvolutionChain(this.especiePokemon.evolution_chain.url).subscribe((data) => {
      this.evoChain = data;
      this.chain = this.evoChain.chain;
      this.modifyEvoChain(this.chain, () => {
        this.traerPokemon();
      });
    });
  }
  
  modifyEvoChain(evoChain: Chain, callback: () => void) {
    this.listaDeEvoluciones.add(evoChain.species.name);
    for (let i = 0; i < evoChain.evolves_to.length; i++) {
      this.listaDeEvoluciones.add(evoChain.species.name);
      const element = evoChain.evolves_to[i];
      if (element.evolves_to.length > 0) {
        this.modifyEvoChain(element, callback);
      } else {
        this.listaDeEvoluciones.add(element.species.name);
      }
    }
    callback(); // Call the callback function once the loop is finished
  }

}
