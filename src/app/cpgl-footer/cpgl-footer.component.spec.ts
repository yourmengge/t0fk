import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpglFooterComponent } from './cpgl-footer.component';

describe('CpglFooterComponent', () => {
  let component: CpglFooterComponent;
  let fixture: ComponentFixture<CpglFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpglFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpglFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
