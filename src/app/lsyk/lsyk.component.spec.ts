import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsykComponent } from './lsyk.component';

describe('LsykComponent', () => {
  let component: LsykComponent;
  let fixture: ComponentFixture<LsykComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsykComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsykComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
