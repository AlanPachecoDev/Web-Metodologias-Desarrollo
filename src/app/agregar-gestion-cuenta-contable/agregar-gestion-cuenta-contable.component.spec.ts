import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarGestionCuentaContableComponent } from './agregar-gestion-cuenta-contable.component';

describe('AgregarGestionCuentaContableComponent', () => {
  let component: AgregarGestionCuentaContableComponent;
  let fixture: ComponentFixture<AgregarGestionCuentaContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarGestionCuentaContableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarGestionCuentaContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
