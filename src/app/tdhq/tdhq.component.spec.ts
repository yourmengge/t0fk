import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdhqComponent } from './tdhq.component';

describe('TdhqComponent', () => {
  let component: TdhqComponent;
  let fixture: ComponentFixture<TdhqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdhqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdhqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
