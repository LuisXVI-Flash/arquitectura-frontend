import { TestBed } from '@angular/core/testing';

import { SolicitudClienteService } from './solicitud-cliente.service';

describe('SolicitudClienteService', () => {
  let service: SolicitudClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
