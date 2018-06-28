import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhlbComponent } from './ghlb.component';

describe('GhlbComponent', () => {
  let component: GhlbComponent;
  let fixture: ComponentFixture<GhlbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhlbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
