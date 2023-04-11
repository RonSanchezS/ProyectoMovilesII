import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-detalle',
  templateUrl: './pokemon-detalle.page.html',
  styleUrls: ['./pokemon-detalle.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [PokeApiService]
})
export class PokemonDetallePage implements OnInit {

  constructor(private route : ActivatedRoute, private api : PokeApiService) { }

  ngOnInit() {
  }

}
