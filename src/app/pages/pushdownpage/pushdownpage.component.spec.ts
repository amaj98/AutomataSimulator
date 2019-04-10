import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushdownpageComponent } from './pushdownpage.component';

describe('PushdownpageComponent', () => {
  let component: PushdownpageComponent;
  let fixture: ComponentFixture<PushdownpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushdownpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushdownpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
