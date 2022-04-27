import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitAtendidComponent } from './solicit-atendid.component';

describe('SolicitAtendidComponent', () => {
  let component: SolicitAtendidComponent;
  let fixture: ComponentFixture<SolicitAtendidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitAtendidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitAtendidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
