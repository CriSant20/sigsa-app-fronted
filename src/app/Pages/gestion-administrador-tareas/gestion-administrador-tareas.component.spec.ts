import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAdministradorTareasComponent } from './gestion-administrador-tareas.component';

describe('GestionAdministradorTareasComponent', () => {
  let component: GestionAdministradorTareasComponent;
  let fixture: ComponentFixture<GestionAdministradorTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAdministradorTareasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAdministradorTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
