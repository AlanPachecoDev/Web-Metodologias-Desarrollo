import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGestionCuentaContableComponent } from './editar-gestion-cuenta-contable.component';

describe('EditarGestionCuentaContableComponent', () => {
  let component: EditarGestionCuentaContableComponent;
  let fixture: ComponentFixture<EditarGestionCuentaContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarGestionCuentaContableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarGestionCuentaContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
