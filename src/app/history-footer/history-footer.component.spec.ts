import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryFooterComponent } from './history-footer.component';

describe('HistoryFooterComponent', () => {
  let component: HistoryFooterComponent;
  let fixture: ComponentFixture<HistoryFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
