import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FplbComponent } from './fplb.component';

describe('FplbComponent', () => {
  let component: FplbComponent;
  let fixture: ComponentFixture<FplbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FplbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FplbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
