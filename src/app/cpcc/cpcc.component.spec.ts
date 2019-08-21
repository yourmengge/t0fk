import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpccComponent } from './cpcc.component';

describe('CpccComponent', () => {
  let component: CpccComponent;
  let fixture: ComponentFixture<CpccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
