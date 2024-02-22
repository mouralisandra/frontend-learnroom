import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseAccordionComponent} from './course-accordion.component';

describe('CourseAccordionComponent', () => {
  let component: CourseAccordionComponent;
  let fixture: ComponentFixture<CourseAccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseAccordionComponent],
    });
    fixture = TestBed.createComponent(CourseAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
