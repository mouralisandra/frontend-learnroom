import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Course, CreateCourse, UpdateCourse} from "@core/models/course.model";
import {Assignement} from "@core/models/assignment.model";
import {Task} from "@core/models/task.model";
import {ApiService} from "@core/services/api.service";
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private api: ApiService) {}
  private selectedCourseSubject = new BehaviorSubject<Course | null>(null);
  selectedCourse$ = this.selectedCourseSubject.asObservable();

  selectCourse(course: Course|null) {
    console.log('course',course);
    this.selectedCourseSubject.next(course);
  }
  // Course
  addCourse(classroom_id: string, course: CreateCourse) {
    return this.api.post<Course>(`/course/${classroom_id}`, course).subscribe();
  }
  getCourse(id: string) {
    return this.api.get<Course>(`/course/${id}`);
  }
  updateCourse(id: string, course: UpdateCourse) {
    return this.api.patch<Course>(`/course/${id}`, course).subscribe();
  }
  deleteCourse(id: string) {
    return this.api.remove(`/course/${id}`);
  }
  // Task
  getTasks(course_id: string) {
    return this.api.get<Task[]>(`/course/task/${course_id}`);
  }
  // Assignment
  getAssignments(course_id: string) {
    return this.api.get<Assignement[]>(`/course/assignment/${course_id}`);
  }
  // Search
  search(searchTerm: string, classroomId: string) {
    return this.api.get<Course[]>(`/course/search?query=${searchTerm}&classroomId=${classroomId}`);
  }
}
