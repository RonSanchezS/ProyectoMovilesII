import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { TarjetaHeroeComponent } from './tarjeta-heroe/tarjeta-heroe.component';



@NgModule({
  declarations: [
    MenuComponent,
    TarjetaHeroeComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MenuComponent,
    TarjetaHeroeComponent
  ]
})
export class ComponentsModule { }
