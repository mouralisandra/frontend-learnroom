import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomPreloadingStrategy} from "./preloading.strategy";
import {authenticatedGuard, disconnectedGuard} from "@core/guards/authenticatedGuard";

const routes: Routes = [
  {
    path: 'classroom',
    loadChildren: () =>
      import('./features/classroom/classroom.module').then((m) => m.ClassroomModule),
    canActivate: [authenticatedGuard],
    data: { preload: true }
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [disconnectedGuard],
    data: { preload: true }
  },
  {
    path: 'classroom',
    loadChildren: () =>
      import('./features/course/course.module').then((m) => m.CourseModule),
    canActivate: [authenticatedGuard],
  },
  {
    path: 'assignment',
    loadChildren: () =>
      import('./features/assignment/assignment.module').then((m) => m.AssignmentModule),
    canActivate: [authenticatedGuard],
  },
  {
    path: 'task',
    loadChildren: () => import('./features/task/task.module').then((m) => m.TaskModule),
    canActivate: [authenticatedGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: CustomPreloadingStrategy})],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
