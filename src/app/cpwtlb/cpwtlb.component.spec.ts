import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpwtlbComponent } from './cpwtlb.component';

describe('CpwtlbComponent', () => {
  let component: CpwtlbComponent;
  let fixture: ComponentFixture<CpwtlbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpwtlbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpwtlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
