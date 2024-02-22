import {Component, inject, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Task} from '@core/models/task.model';
import {AuthPersistence} from "@core/services/auth.persistence";
import {TaskFormComponent} from "@features/task/components/task-form/task-form.component";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks : Task[] = [];
  @Input() courseId: string | undefined;
  @Input () inCard:boolean = false;
  @Input () withButton: boolean=false;
  authService = inject(AuthPersistence)// Fictive data, replace with your actual data
  modal = inject(NgbModal);
  onAddTaskClick(): void {
    const modal = this.modal.open(TaskFormComponent)
    modal.componentInstance.courseId = this.courseId
  }
}
