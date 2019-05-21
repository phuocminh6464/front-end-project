import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPositionComponent } from './new-position.component';

describe('NewPositionComponent', () => {
  let component: NewPositionComponent;
  let fixture: ComponentFixture<NewPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
