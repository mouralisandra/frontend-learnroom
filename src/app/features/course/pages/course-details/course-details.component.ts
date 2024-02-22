import {Component, OnInit} from '@angular/core';
import {Observable, tap} from "rxjs";
import {Assignement} from "@core/models/assignment.model";
import {Course} from "@core/models/course.model";
import {ActivatedRoute} from "@angular/router";
import {Task} from "@core/models/task.model";
import {CourseService} from "@features/course/course.service";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit{
  tasks$: Observable<Task[]> = new Observable<Task[]>();
  assignments$: Observable<Assignement[]> = new Observable<Assignement[]>();
  course$: Observable<Course> = new Observable<Course>();
  courseId: string="";
  constructor(private route: ActivatedRoute,private courseService: CourseService)
  { }

  ngOnInit(): void {
    this.route.params.pipe(tap(param=>{
      this.courseId = param['id']
      this.course$=this.courseService.getCourse(this.courseId)
      this.tasks$=this.courseService.getTasks(this.courseId)
      this.assignments$=this.courseService.getAssignments(this.courseId)
    })).subscribe();
  }

}
