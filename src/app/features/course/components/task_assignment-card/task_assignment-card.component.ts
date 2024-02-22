import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-task_assignment-card',
  templateUrl: './task_assignment-card.component.html',
  styleUrls: ['./task_assignment-card.component.scss'],
})
export class Task_assignmentCardComponent {
  @Input() path: string = '/task';
  @Input() task: { name: string } = { name: 'nada' };

  constructor(private router: Router) {}

  navigateToPath() {
    this.router.navigate([this.path]);
  }
}
