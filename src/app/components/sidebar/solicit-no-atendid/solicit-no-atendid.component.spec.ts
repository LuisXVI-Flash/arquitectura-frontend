import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitNoAtendidComponent } from './solicit-no-atendid.component';

describe('SolicitNoAtendidComponent', () => {
  let component: SolicitNoAtendidComponent;
  let fixture: ComponentFixture<SolicitNoAtendidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitNoAtendidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitNoAtendidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
