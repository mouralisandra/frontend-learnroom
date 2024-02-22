import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from "@core/models/task.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Assignement} from "@core/models/assignment.model";
import {TaskService} from "@features/task/task.service";


@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss']
})
export class EditTaskFormComponent{
  taskForm: FormGroup = new FormGroup({});
  taskService = inject(TaskService);
  @Input() task: Task = {} as Task;
  @Input() taskId:String = "1";
  @Output() editForm =  new EventEmitter<Assignement>

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
  ) {

  }
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: [this.task.name, Validators.required],
      content: [this.task.content, Validators.required],
      points: [this.task.points, [Validators.required, Validators.min(1)]],
    });
    console.log("task",this.task)
    console.log("task",this.taskId)
    }
  validateField(field: string, code: string) {
    const formControl = this.taskForm.get(field);
    return formControl?.hasError(code) && formControl?.touched;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      // Handle form submission
      const formData = this.taskForm.value;
      this.editForm.emit(formData)
      this.activeModal.close();

    }
  }

  onClose() {
    this.activeModal.dismiss('Close click');
  }
}
