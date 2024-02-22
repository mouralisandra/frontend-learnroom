import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Classroom} from "@core/models/classroom.model";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
})
export class CourseFormComponent {
  @Input() values = { name: '', content: '' };
  courseForm: FormGroup;
  @Output() submit = new EventEmitter<Classroom>

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
  ) {
    this.courseForm = this.fb.group({
      name: [this.values.name, [Validators.required]],
      content: [this.values.content, [Validators.required]],
    });
  }
  validateField(field: string, code: string) {
    const formControl = this.courseForm.get(field);
    return formControl?.hasError(code) && formControl?.touched;
  }

  onSubmit() {
    if (this.courseForm.valid) {
      // Handle form submission or emit an event
      const formValues = this.courseForm.value;
      this.submit.emit(formValues)
      this.modal.dismiss();
    }
  }
  onClose() {
    this.modal.dismiss();
  }
}
