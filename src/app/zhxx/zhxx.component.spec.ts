import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZhxxComponent } from './zhxx.component';

describe('ZhxxComponent', () => {
  let component: ZhxxComponent;
  let fixture: ComponentFixture<ZhxxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZhxxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZhxxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
