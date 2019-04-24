import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawfsmComponent } from './drawfsm.component';

describe('DrawfsmComponent', () => {
  let component: DrawfsmComponent;
  let fixture: ComponentFixture<DrawfsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawfsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawfsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
