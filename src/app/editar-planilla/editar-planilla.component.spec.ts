import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPlanillaComponent } from './editar-planilla.component';

describe('EditarPlanillaComponent', () => {
  let component: EditarPlanillaComponent;
  let fixture: ComponentFixture<EditarPlanillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPlanillaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPlanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
