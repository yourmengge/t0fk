import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CplrtjComponent } from './cplrtj.component';

describe('CplrtjComponent', () => {
  let component: CplrtjComponent;
  let fixture: ComponentFixture<CplrtjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CplrtjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CplrtjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
