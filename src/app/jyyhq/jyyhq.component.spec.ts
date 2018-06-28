import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JyyhqComponent } from './jyyhq.component';

describe('JyyhqComponent', () => {
  let component: JyyhqComponent;
  let fixture: ComponentFixture<JyyhqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JyyhqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JyyhqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
