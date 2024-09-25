import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPlanillasComponent } from './listar-planillas.component';

describe('ListarPlanillasComponent', () => {
  let component: ListarPlanillasComponent;
  let fixture: ComponentFixture<ListarPlanillasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPlanillasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPlanillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
