import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {combineLatest, debounceTime, distinctUntilChanged, map, Observable, of, startWith, switchMap, tap} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Classroom} from "@core/models/classroom.model";
import {Assignement} from "@core/models/assignment.model";
import {Student, Teacher} from "@core/models/user.model";
import {Course} from "@core/models/course.model";
import {AuthPersistence} from "@core/services/auth.persistence";
import {StudentFormComponent} from "@features/classroom/components/student-form/student-form.component";
import {Task} from "@core/models/task.model";
import {ClassroomService} from "@features/classroom/classroom.service";
import {CourseService} from "@features/course/course.service";


@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.scss'],
})
export class ClassroomDetailComponent {
  active = 1;
  classroom$: Observable<Classroom | undefined> = new Observable();
  classroomService = inject(ClassroomService)
  assignments$: Observable<Assignement[]> = new Observable();
  tasks$: Observable<Task[]> = new Observable()
  students$: Observable<{ teacher: Teacher; students: Student[] } | null> = new Observable();
  router = inject(ActivatedRoute)
  courses$: Observable<Course[]> | undefined = new Observable<Course[]>();
  modalService = inject(NgbModal)
  authService = inject(AuthPersistence)
  searchForm: FormGroup = new FormGroup({});
  searchResults$: Observable<Classroom[]> | undefined = new Observable();
  fb = inject(FormBuilder);
  courseService = inject(CourseService)
  taskFilter: 'completed' | 'inProgress' | undefined = undefined

  initSearch() {
    this.searchForm = this.fb.group({
      searchTerm: [''], // Initial value can be an empty string or any other default value
    });

    this.courses$ = this.searchForm.get('searchTerm')?.valueChanges.pipe(
      debounceTime(200), // wait for 300ms pause in events
      switchMap((searchTerm: string) => this.courseService.search(searchTerm, this.router.snapshot.params['id'] as string)),
      tap((courses) => console.log(courses)),
      catchError((err) => { console.log(err); return [] })
    )
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchTerm: [''], // Initial value can be an empty string or any other default value
    });
    this.classroom$ = this.router.params.pipe(
      switchMap(params => this.classroomService.getClassroom(params['id']))
    );

    this.classroom$.subscribe(classroom => {
      this.assignments$ = this.classroomService.getAssignments(classroom?.id || '')
      this.tasks$ = this.classroomService.getTasks(classroom?.id || '', this.taskFilter)
      this.students$ = this.classroomService.getUsers(classroom?.id || '')
    })


    // Combine observables for search term and classroom ID
    const combinedSearch$ = combineLatest([
      this.searchForm.get('searchTerm')?.valueChanges.pipe(debounceTime(200),
        startWith(''),) || of(''),
      this.classroom$.pipe(
        map(classroom => classroom?.id || ''),
        distinctUntilChanged()
      )
    ]);

    // Use combined observable to trigger course search
    this.courses$ = combinedSearch$.pipe(
      switchMap(([searchTerm, classroomId]: [string, string]) => {
        if (searchTerm) {
          return this.courseService.search(searchTerm, classroomId)
        }
        return this.classroomService.getCourses(classroomId)
        }),
      catchError((err) => {
        console.log(err);
        return []
      })
    );

  }
  onTaskFilterChange(filter: 'completed' | 'inProgress' | undefined) {
    this.taskFilter = filter
    this.tasks$ = this.classroomService.getTasks(this.router.snapshot.params['id']|| '', this.taskFilter)
  }
  onAddStudentClick() {
    const modal = this.modalService.open(StudentFormComponent)
    modal.componentInstance.classroomId = this.router.snapshot.params['id']
  }
}

