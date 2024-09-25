import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTrabajadorComponent } from './editar-trabajador.component';

describe('EditarTrabajadorComponent', () => {
  let component: EditarTrabajadorComponent;
  let fixture: ComponentFixture<EditarTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTrabajadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
