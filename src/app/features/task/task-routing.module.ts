import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskDetailsComponent} from '@features/task/pages/task-details/task-details.component';

const routes: Routes = [{ path: ':id', component: TaskDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
