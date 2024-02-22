import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-classroom-id',
  templateUrl: './classroom-id.component.html',
})
export class ClassroomIdComponent {
  @Input() values = {id: ''};
  classroomForm: FormGroup;
  @Output() submit = new EventEmitter<string>

  constructor(private fb: FormBuilder,
              private modal: NgbActiveModal,
              ) {
    this.classroomForm = this.fb.group({
      id: [this.values.id, [Validators.required]],
    });


  }

  onSubmit() {
    if (this.classroomForm.valid) {
      this.submit.emit(this.classroomForm.value.id)
      this.modal.dismiss();

    }
  }
  onClose() {
    // Handle close modal logic here
    this.modal.dismiss();
  }
}
