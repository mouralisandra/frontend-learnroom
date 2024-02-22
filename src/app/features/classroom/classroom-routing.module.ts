import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClassroomListComponent} from "@features/classroom/pages/classroom-list/classroom-list.component";

const routes: Routes = [
  { path: '', component: ClassroomListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomRoutingModule {}
