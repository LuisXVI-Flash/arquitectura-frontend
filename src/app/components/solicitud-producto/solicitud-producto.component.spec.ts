import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudProductoComponent } from './solicitud-producto.component';

describe('SolicitudProductoComponent', () => {
  let component: SolicitudProductoComponent;
  let fixture: ComponentFixture<SolicitudProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
