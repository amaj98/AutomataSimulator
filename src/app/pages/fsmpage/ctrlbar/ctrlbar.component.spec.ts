import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrlbarComponent } from './ctrlbar.component';

describe('CtrlbarComponent', () => {
  let component: CtrlbarComponent;
  let fixture: ComponentFixture<CtrlbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtrlbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrlbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
