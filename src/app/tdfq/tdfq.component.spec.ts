import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdfqComponent } from './tdfq.component';

describe('TdfqComponent', () => {
  let component: TdfqComponent;
  let fixture: ComponentFixture<TdfqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdfqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
