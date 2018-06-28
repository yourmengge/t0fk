import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CjlbComponent } from './cjlb.component';

describe('CjlbComponent', () => {
  let component: CjlbComponent;
  let fixture: ComponentFixture<CjlbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CjlbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CjlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
