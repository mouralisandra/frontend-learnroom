import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, switchMap} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {AuthPersistence} from "@core/services/auth.persistence";
import {Classroom} from "@core/models/classroom.model";
import {Router} from "@angular/router";
import {User} from "@core/models/user.model";
import {ClassroomFormComponent} from "@features/classroom/components/classroom-form/classroom-form..component";
import {ClassroomIdComponent} from "@features/classroom/components/classroom-id/classroom-id.component";
import {ClassroomService} from "@features/classroom/classroom.service";


@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent implements OnInit {

  fb = inject(FormBuilder);
  authService = inject(AuthPersistence);
  modalService = inject(NgbModal);
  classroomService = inject(ClassroomService)
  classrooms: Classroom[] = [];
  isTeacher: boolean | undefined;
  label = 'Enroll in a classroom';
  searchForm: FormGroup = new FormGroup({});
  searchResults$: BehaviorSubject<Classroom[]> = new BehaviorSubject<Classroom[]>([]);
  private router: Router = inject(Router);
  user:User | undefined;
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });

    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.searchForm.get('searchTerm')?.valueChanges.pipe(debounceTime(200)).pipe(
      switchMap((searchTerm) => {
        return this.classroomService.getClassrooms(searchTerm);
      })
    ).subscribe((classrooms) => {
      this.classrooms = classrooms;
      this.searchResults$.next(classrooms);
    });

    this.classroomService.getClassrooms().subscribe((classrooms:Classroom[]) => {
      this.classrooms = classrooms;
      this.searchResults$.next(classrooms);
    });

    this.authService.isTeacher$.subscribe((user) => {
      this.isTeacher = user;
      if (user) {
        this.label = 'Create a classroom';
      }
    });
  }

  onClick() {
    if(this.isTeacher && this.user)
    {
      const modal = this.modalService.open(ClassroomFormComponent)
      modal.componentInstance.submit.subscribe((emmitedValue:any) => {
        this.addClassroom(emmitedValue)
      });
    }
    else if(this?.user?.email) {
      const modal =this.modalService.open(ClassroomIdComponent) ;
      modal.componentInstance.submit.subscribe((emmitedValue:any) => {
        this.enrollClassroom(emmitedValue)
      });
    }
  }

  addClassroom(formValues:any)
  {
    this.classroomService.addClassroom(formValues, this.user?.id as string).subscribe(
      {
        complete: () => this.refetchData()

      }    )
      }

  enrollClassroom(formValues:any){
    this.classroomService.addStudent(formValues, this.user?.email as string).subscribe(
      {
        complete: () => this.refetchData()

      }    )

  }
  refetchData() {
    this.classroomService.getClassrooms().subscribe((classrooms:Classroom[]) => {
      this.classrooms = classrooms;
      this.searchResults$.next(classrooms);
    });
  }
}
