import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortComponent } from './sort/sort.component';
import { GenerationComponent } from './generation/generation.component';
import { FilterComponent } from './filter/filter.component';
import { IonicModule } from '@ionic/angular';
import { AboutComponent } from './about/about.component';
import { StatsComponent } from './stats/stats.component';
import { EvolutionComponent } from './evolution/evolution.component';



@NgModule({
  declarations: [
    SortComponent,
    GenerationComponent,
    FilterComponent,
    AboutComponent,
    StatsComponent,
    EvolutionComponent,
  ],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [
    SortComponent,
    GenerationComponent,
    AboutComponent,
    StatsComponent,
    EvolutionComponent,
    FilterComponent,
    AboutComponent
  ]
})
export class ModalsModule { }
