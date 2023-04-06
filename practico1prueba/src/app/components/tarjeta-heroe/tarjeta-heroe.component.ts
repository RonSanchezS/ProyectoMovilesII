import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-heroe',
  templateUrl: './tarjeta-heroe.component.html',
  styleUrls: ['./tarjeta-heroe.component.scss'],
})
export class TarjetaHeroeComponent  implements OnInit {

  @Input() heroe: any;

  constructor() { }

  ngOnInit() {}

}
