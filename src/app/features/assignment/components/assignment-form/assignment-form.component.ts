import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Assignement} from "@core/models/assignment.model";
import {AssignementService} from "@features/assignment/assignement.service";


@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
})
export class AssignmentFormComponent {
  @Input() values = {
    name: '',
    content: '',
    points: undefined,
    deadline: undefined,
  };
  buttonName:string="Add";
  assignmentForm: FormGroup=new FormGroup({});
  assignmentService = inject(AssignementService)
  @Input() courseId: string = '';
  @Input() isEditing: boolean = false;
  @Input() assignment: Assignement = {} as Assignement;
  @Input() assignmentId:string = "1";
  @Output() submit = new EventEmitter<Assignement>
  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
  ) {

  }
  ngOnInit(): void {
   if (this.isEditing)
   {
     this.buttonName="Edit"
     this.assignmentForm = this.fb.group({
       name: [this.assignment.name, Validators.required],
       content: [this.assignment.content, Validators.required],
       points: [this.assignment.points, [Validators.required, Validators.min(1)]],
       deadline: [this.assignment.deadline, [Validators.required]],

     });
   }

   else
   {
     this.assignmentForm = this.fb.group({
       name: ["", [Validators.required]],
       content: ["", [Validators.required]],
       points: [undefined,  [Validators.required, Validators.min(1)]],
       deadline: [undefined, [Validators.required]],
     });
   }
  }

  validateField(field: string, code: string) {
    const formControl = this.assignmentForm.get(field);
    return formControl?.hasError(code) && formControl?.touched;
  }

  onSubmit() {
    if (this.assignmentForm.valid) {
      const formValues = this.assignmentForm.value;
      if(this.isEditing)
        this.submit.emit(formValues)

      else
        this.assignmentService.addAssignement(this.courseId, formValues)

    this.activeModal.close();
    }
  }
  onClose() {
    this.activeModal.dismiss();
  }
}
