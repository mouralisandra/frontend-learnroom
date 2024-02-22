import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Assignement, ResponseAssignement} from "@core/models/assignment.model";
import {AuthPersistence} from "@core/services/auth.persistence";
import {AssignmentFormComponent} from "@features/assignment/components/assignment-form/assignment-form.component";
import {AssignementService} from "@features/assignment/assignement.service";


@Component({
  selector: 'app-assignement-details',
  templateUrl: './assignement-details.component.html',
  styleUrls: ['./assignement-details.component.scss']
})
export class AssignementDetailsComponent implements OnInit {
  user: any = {role:"teacher"}
  assignmentId: string="";
  assignment: Assignement = {} as Assignement;
  assignment$: Observable<Assignement> = new Observable<Assignement>();
  responseAssignment$: Observable<ResponseAssignement> = new Observable<ResponseAssignement>();
  responsesAssignment:ResponseAssignement[]=[]
  submitAssignmentForm: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(5)])
  });
  editMode:boolean=false;
  isAssignmentSubmited:boolean=false;
  modalService = inject(NgbModal);
  isTeacher : boolean = false;

  constructor(private route: ActivatedRoute,
              public authService : AuthPersistence, private router:Router, private formBuilder: FormBuilder, private assignmentService: AssignementService)
  {
    this.submitAssignmentForm.controls['description'].setErrors({ 'minLength': 'Min length 5 chars.' });

  }

  ngOnInit(): void {
    this.route.params.pipe(tap(param => {
      this.assignmentId = param['id']
      this.assignmentId = this.route.snapshot.params['id'];
      this.assignmentService.getAssignment(this.assignmentId).pipe(
        tap(res => {
          this.assignment = res
        })
      ).subscribe()
      this.assignment$.subscribe(data => {
        if (data && data.responseAssignments as ResponseAssignement[]) {
          this.responsesAssignment = [...data.responseAssignments]; // Creating a shallow copy
        }
      });
      this.authService.isTeacher$.subscribe((user) => {
          this.isTeacher = user;
        }
      );
    })).subscribe();
    if (!this.isTeacher) {
      this.responseAssignment$ = this.assignmentService.getResponseAssignment(this.assignmentId)

      this.responseAssignment$.subscribe(data => {
        if (data.content) {
          this.isAssignmentSubmited = true
        }
      });

      if (!this.isTeacher) {
        this.responseAssignment$ = this.assignmentService.getResponseAssignment(this.assignmentId)

        this.responseAssignment$.subscribe(data => {
          if (data.content) {
            this.isAssignmentSubmited = true
          }
        });
      }


    }
  }
  deleteAssignment(){
  this.assignmentService.deleteAssignment(this.assignmentId)
  this.router.navigate(['/classroom']);

  }
  editAssignement(formValues:any)
  {
    this.assignmentService.updateAssignment(this.assignmentId, formValues)
    this.assignmentService.getAssignment(this.assignmentId).pipe(
      tap(res => {this.assignment = res})).subscribe()
  }
  toggleEditMode(mode:boolean){
    this.editMode=mode;
    const modal = this.modalService.open(AssignmentFormComponent)
    modal.componentInstance.assignment = this.assignment;
    modal.componentInstance.assignmentId = this.assignmentId
    modal.componentInstance.isEditing = true;
    modal.componentInstance.submit.subscribe((emmitedValue:any) => {
      this.editAssignement(emmitedValue)
    });

  }

  submitResponseAssignment(assignementResponseId:string){

  }
  onScoreChange(event: Event, index: number) {
    const newScore=(event.target as HTMLInputElement).value;
    const updatedResponse:ResponseAssignement[] = this.responsesAssignment.map((item, i) => {
      if (i === index) {
        return {...item, score: parseInt(newScore)}
      }
      return item;
    });
    this.responsesAssignment = updatedResponse
  }

onSubmit: any = () => {
  this.assignmentService.updateResponseAssignment(this.assignmentId,this.submitAssignmentForm?.value)
  this.isAssignmentSubmited=true;
}


}
