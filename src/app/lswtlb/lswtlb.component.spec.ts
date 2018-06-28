import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LswtlbComponent } from './lswtlb.component';

describe('LswtlbComponent', () => {
  let component: LswtlbComponent;
  let fixture: ComponentFixture<LswtlbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LswtlbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LswtlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
