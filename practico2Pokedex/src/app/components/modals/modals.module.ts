import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortComponent } from './sort/sort.component';
import { GenerationComponent } from './generation/generation.component';
import { FilterComponent } from './filter/filter.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    SortComponent,
    GenerationComponent,
    FilterComponent
  ],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [
    SortComponent,
    GenerationComponent,
    FilterComponent]
})
export class ModalsModule { }
