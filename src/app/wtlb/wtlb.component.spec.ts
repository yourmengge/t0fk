import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WtlbComponent } from './wtlb.component';

describe('WtlbComponent', () => {
  let component: WtlbComponent;
  let fixture: ComponentFixture<WtlbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WtlbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WtlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
