import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAdministradorEncuestasComponent } from './vista-administrador-encuestas.component';

describe('VistaAdministradorEncuestasComponent', () => {
  let component: VistaAdministradorEncuestasComponent;
  let fixture: ComponentFixture<VistaAdministradorEncuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaAdministradorEncuestasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaAdministradorEncuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
