import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitGeneralComponent } from './solicit-general.component';

describe('SolicitGeneralComponent', () => {
  let component: SolicitGeneralComponent;
  let fixture: ComponentFixture<SolicitGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
