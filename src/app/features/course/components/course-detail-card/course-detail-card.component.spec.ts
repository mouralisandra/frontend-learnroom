import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseDetailCardComponent} from './course-detail-card.component';

describe('CourseDetailCardComponent', () => {
  let component: CourseDetailCardComponent;
  let fixture: ComponentFixture<CourseDetailCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDetailCardComponent]
    });
    fixture = TestBed.createComponent(CourseDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
