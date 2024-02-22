import {Component, inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {CourseService} from '../../course.service';
import {Course} from "@core/models/course.model";


@Component({
  selector: 'app-course-accordion',
  templateUrl: './course-accordion.component.html',
  styleUrls: ['./course-accordion.component.scss'],
})
export class CourseAccordionComponent {
  @Input() course: Course | undefined;
  router = inject(Router);
  courseService = inject(CourseService);



  onSelectCourse(course: Course | undefined) {
    if (course) {  this.courseService.selectCourse(course);}


  }
}
