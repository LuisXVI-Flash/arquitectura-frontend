import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudClienteComponent } from './solicitud-cliente.component';

describe('SolicitudClienteComponent', () => {
  let component: SolicitudClienteComponent;
  let fixture: ComponentFixture<SolicitudClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
