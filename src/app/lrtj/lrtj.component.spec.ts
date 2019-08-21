import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LrtjComponent } from './lrtj.component';

describe('LrtjComponent', () => {
  let component: LrtjComponent;
  let fixture: ComponentFixture<LrtjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LrtjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LrtjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
