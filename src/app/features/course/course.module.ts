import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseRoutingModule} from './course-routing.module';
import {CourseListComponent} from './components/course-list/course-list.component';
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkBase, NgbNavOutlet} from '@ng-bootstrap/ng-bootstrap';
import {CourseAccordionComponent} from './components/course-accordion/course-accordion.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CourseDetailsComponent} from "@features/course/pages/course-details/course-details.component";
import {CourseDetailCardComponent} from '@features/course/components/course-detail-card/course-detail-card.component';
import {CourseFormComponent} from "@features/course/components/course-form/course-form.component";
import {SharedModule} from "@shared/shared.module";
import {ClassroomDetailComponent} from "@features/course/pages/classroom-detail/classroom-detail.component";
import {StudentComponent} from "@features/course/components/student/student.component";
import {AssignmentListComponent} from "@features/course/components/assignment-list/assignment-list.component";
import {TaskListComponent} from "@features/course/components/task-list/task-list.component";
import {
  Task_assignmentCardComponent
} from "@features/course/components/task_assignment-card/task_assignment-card.component";

@NgModule({
  declarations: [
    CourseListComponent,
    CourseAccordionComponent,
    CourseFormComponent,
    CourseDetailsComponent,
    CourseDetailCardComponent,
    ClassroomDetailComponent,
    StudentComponent,
    AssignmentListComponent,
    TaskListComponent,
    Task_assignmentCardComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    NgbNavItem,
    NgbNavOutlet,
    NgbNavContent,
    NgbNavLinkBase,
    ReactiveFormsModule,
    NgbNav,
  ],
  exports: [CourseListComponent],
})
export class CourseModule {}
