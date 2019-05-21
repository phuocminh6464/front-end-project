import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FearureComponent } from './fearure.component';

describe('FearureComponent', () => {
  let component: FearureComponent;
  let fixture: ComponentFixture<FearureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FearureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FearureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
