import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpcjlbComponent } from './cpcjlb.component';

describe('CpcjlbComponent', () => {
  let component: CpcjlbComponent;
  let fixture: ComponentFixture<CpcjlbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpcjlbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpcjlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
