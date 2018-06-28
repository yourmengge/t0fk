import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdglFooterComponent } from './tdgl-footer.component';

describe('TdglFooterComponent', () => {
  let component: TdglFooterComponent;
  let fixture: ComponentFixture<TdglFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdglFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdglFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
