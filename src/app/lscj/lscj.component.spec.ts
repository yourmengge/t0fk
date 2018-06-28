import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LscjComponent } from './lscj.component';

describe('LscjComponent', () => {
  let component: LscjComponent;
  let fixture: ComponentFixture<LscjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LscjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LscjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
