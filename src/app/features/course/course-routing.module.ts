import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseDetailsComponent} from "@features/course/pages/course-details/course-details.component";
import {ClassroomDetailComponent} from "@features/course/pages/classroom-detail/classroom-detail.component";

const routes: Routes = [
  { path: ':id', component: ClassroomDetailComponent },
  { path: 'course/:id', component: CourseDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}

