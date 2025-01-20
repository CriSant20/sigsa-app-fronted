import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallaGestionAdministradorComponent } from './pantalla-gestion-administrador.component';

describe('PantallaGestionAdministradorComponent', () => {
  let component: PantallaGestionAdministradorComponent;
  let fixture: ComponentFixture<PantallaGestionAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantallaGestionAdministradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaGestionAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
