import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCuentaContableComponent } from './gestion-cuenta-contable.component';

describe('GestionCuentaContableComponent', () => {
  let component: GestionCuentaContableComponent;
  let fixture: ComponentFixture<GestionCuentaContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCuentaContableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCuentaContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
