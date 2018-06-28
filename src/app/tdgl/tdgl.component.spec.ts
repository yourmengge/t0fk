import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdglComponent } from './tdgl.component';

describe('TdglComponent', () => {
  let component: TdglComponent;
  let fixture: ComponentFixture<TdglComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdglComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
