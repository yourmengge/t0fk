import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpfqComponent } from './cpfq.component';

describe('CpfqComponent', () => {
  let component: CpfqComponent;
  let fixture: ComponentFixture<CpfqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpfqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
