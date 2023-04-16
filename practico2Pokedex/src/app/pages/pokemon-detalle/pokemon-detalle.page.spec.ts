import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetallePage } from './pokemon-detalle.page';

describe('PokemonDetallePage', () => {
  let component: PokemonDetallePage;
  let fixture: ComponentFixture<PokemonDetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PokemonDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
