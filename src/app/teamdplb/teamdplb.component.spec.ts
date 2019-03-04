import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamdplbComponent } from './teamdplb.component';

describe('TeamdplbComponent', () => {
  let component: TeamdplbComponent;
  let fixture: ComponentFixture<TeamdplbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamdplbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamdplbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
