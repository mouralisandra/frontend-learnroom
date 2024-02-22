import {NgModule} from '@angular/core';
import {TaskRoutingModule} from './task-routing.module';
import {CommonModule} from '@angular/common';
import {TaskDetailsComponent} from '@features/task/pages/task-details/task-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditTaskFormComponent} from "@features/task/components/edit-task-form/edit-task-form.component";
import {TaskFormComponent} from "@features/task/components/task-form/task-form.component";
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [TaskDetailsComponent, EditTaskFormComponent,TaskFormComponent],
    imports: [
        CommonModule,
        TaskRoutingModule,
        ReactiveFormsModule,
        SharedModule,
    ],
})
export class TaskModule {}
