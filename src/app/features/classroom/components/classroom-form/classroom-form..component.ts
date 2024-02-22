// Import necessary Angular modules
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthPersistence} from "@core/services/auth.persistence";
import {Classroom} from "@core/models/classroom.model";

@Component({
  selector: 'app-classroom-form',
  templateUrl: './classroom-form.component.html',
  styleUrls: ['./classroom-form.component.scss'],
})
export class ClassroomFormComponent {
  @Input() values = { name: '', description: '' };
  classroomForm: FormGroup;
  authService = inject(AuthPersistence);
  userId: string | undefined;
  @Output() submit = new EventEmitter<Classroom>
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
  ) {
    this.classroomForm = this.fb.group({
      name: [this.values.name, Validators.required],
      description: [this.values.description, Validators.required],
    });
    this.authService.user$.subscribe((user) => {
     this.userId = user?.id;
    });
  }


  onSubmit() {
    // Handle form submission logic here
    const formValues = this.classroomForm.value;
    if (this.classroomForm.valid && this.userId) {
        this.submit.emit(formValues)
         this.modal.dismiss();

    }
  }
  validateField(field: string, code: string) {
    const formControl = this.classroomForm.get(field);
    return formControl?.hasError(code) && formControl?.touched;
  }
  onClose() {
    // Handle close modal logic here
    this.modal.dismiss();
  }
}
