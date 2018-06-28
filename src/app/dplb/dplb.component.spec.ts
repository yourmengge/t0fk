import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DplbComponent } from './dplb.component';

describe('DplbComponent', () => {
  let component: DplbComponent;
  let fixture: ComponentFixture<DplbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DplbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DplbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
