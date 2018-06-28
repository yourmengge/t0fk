import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LslylComponent } from './lslyl.component';

describe('LslylComponent', () => {
  let component: LslylComponent;
  let fixture: ComponentFixture<LslylComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LslylComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LslylComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
