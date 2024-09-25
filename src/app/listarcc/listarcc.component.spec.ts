import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListarCComponent } from './listarcc.component';

describe('ListarCCComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ListarCComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ListarCComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Interfaz-Login'`, () => {
    const fixture = TestBed.createComponent(ListarCComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Interfaz-Login');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ListarCComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('Interfaz-Login app is running!');
  });
});

