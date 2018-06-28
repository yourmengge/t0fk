import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpglComponent } from './cpgl.component';

describe('CpglComponent', () => {
  let component: CpglComponent;
  let fixture: ComponentFixture<CpglComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpglComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
