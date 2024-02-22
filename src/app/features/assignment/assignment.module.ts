import {NgModule} from '@angular/core';
import {AssignmentRoutingModule} from './assignment-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AssignmentFormComponent} from "@features/assignment/components/assignment-form/assignment-form.component";
import {SharedModule} from "@shared/shared.module";
import {
  AssignementDetailsComponent
} from "@features/assignment/pages/assignement-details/assignement-details.component";

@NgModule({
  declarations: [
    AssignmentFormComponent,
    AssignementDetailsComponent,
  ],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
})
export class AssignmentModule {}
