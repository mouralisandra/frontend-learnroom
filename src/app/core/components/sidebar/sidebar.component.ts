import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Course} from "@core/models/course.model";
import {Assignement} from "@core/models/assignment.model";
import {AuthPersistence} from "@core/services/auth.persistence";
import {AuthService} from "@features/auth/auth.service";
import {Router} from "@angular/router";
import {Task} from "@core/models/task.model";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Output() toggle = new EventEmitter<void>();
  @Input() isCollapsed: boolean = true;

  data$ : BehaviorSubject<{courses:Course[][],tasks:Task[][],assignments:Assignement[][]}> = new BehaviorSubject<{courses:Course[][],tasks:Task[][],assignments:Assignement[][]}>({ courses:[], tasks: [], assignments: [] });
  courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  assignments$: BehaviorSubject<Assignement[]> = new BehaviorSubject<Assignement[]>([]);

  authService = inject(AuthPersistence);
  connService = inject(AuthService);
  currentUser$ = this.authService.user$

  constructor(private router: Router) {}

  ngOnInit():void{
    this.connService.getAll().subscribe((data) => {

      this.data$.next(data);
      const allCourses: Course[] = ([] as Course[]).concat(...data.courses);
      this.courses$.next(allCourses);
      console.log('Courses:', this.courses$.getValue());
      const allTasks: Task[] = ([] as Task[]).concat(...data.tasks);
      this.tasks$.next(allTasks);
      const allAssignments: Assignement[] = ([] as Assignement[]).concat(...data.assignments);
      this.assignments$.next(allAssignments);

    })
  }

  toggleSidebar(): void {
    this.toggle.emit();
    console.log(this.currentUser$)
  }

  navigateToHome():void {
    this.toggleSidebar();
    this.router.navigate(['/classroom']);
  }

  navigateToCourse(courseId:string):void{
    this.toggleSidebar();
    console.log(courseId);
    this.router.navigate([`/classroom/course/${courseId}`]);
  }

  navigateToTask(taskId:string):void{
    this.toggleSidebar();
    this.router.navigate([`/task/${taskId}`]);
  }

  navigateToAssignment(assignmentId:string):void{
    this.toggleSidebar();
    this.router.navigate([`/assignment/${assignmentId}`]);
  }

}
