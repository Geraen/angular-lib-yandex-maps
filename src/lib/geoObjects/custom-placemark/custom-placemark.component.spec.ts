import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPlacemarkComponent } from './custom-placemark.component';

describe('CustomPlacemarkComponent', () => {
  let component: CustomPlacemarkComponent;
  let fixture: ComponentFixture<CustomPlacemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPlacemarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPlacemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
