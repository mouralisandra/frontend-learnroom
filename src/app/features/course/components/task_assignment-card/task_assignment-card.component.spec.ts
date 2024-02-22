import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Task_assignmentCardComponent} from './task_assignment-card.component';

describe('TaskAssignmentCardComponent', () => {
  let component: Task_assignmentCardComponent;
  let fixture: ComponentFixture<Task_assignmentCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Task_assignmentCardComponent],
    });
    fixture = TestBed.createComponent(Task_assignmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
