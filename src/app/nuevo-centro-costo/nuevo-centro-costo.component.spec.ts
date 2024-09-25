import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCentroCostoComponent } from './nuevo-centro-costo.component';

describe('NuevoCentroCostoComponent', () => {
  let component: NuevoCentroCostoComponent;
  let fixture: ComponentFixture<NuevoCentroCostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoCentroCostoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
