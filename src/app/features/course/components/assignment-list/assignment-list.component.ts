import {Component, inject, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Assignement} from "@core/models/assignment.model";
import {AuthPersistence} from "@core/services/auth.persistence";
import {AssignmentFormComponent} from "@features/assignment/components/assignment-form/assignment-form.component";


@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss'],
})
export class AssignmentListComponent {
  @Input() assignments: Assignement[] = [];
  @Input() courseId: string | undefined;
  @Input () inCard:boolean = false;
  @Input() withButton:boolean=false;

  modalService = inject(NgbModal)
  authService = inject(AuthPersistence)
  onAddAssignmentClick() {
   const modal =  this.modalService.open(AssignmentFormComponent);
   modal.componentInstance.courseId = this.courseId
  }
  /*getAssignments(): void {
    // Fictive data, replace with your actual service call
    this.assignments = [
      {
        id: '1',
        name: 'assignments 1',
        description: 'Description for assignments 1',
      },
      {
        id: '2',
        name: 'assignments 2',
        description: 'Description for assignments 2',
      },
      // Add more tasks as needed
    ];
  }*/
}
