import {Component, Input} from '@angular/core';
import {Student, Teacher} from "@core/models/user.model";

@Component({
  selector: 'app-students',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  @Input() users!: {teacher:Teacher,students:Student[]};

}
