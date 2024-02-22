// classroom-card.component.ts
import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-classroom-card',
  templateUrl: './classroom-card.component.html',
  styleUrls: ['./classroom-card.component.scss'],
})
export class ClassroomCardComponent {
  @Input() classroom: {
    id: string;
    name: string;
    image: string;
    description: string;
  } = {
    id: 'iddd',
    name: 'Math',
    image: 'assets/images/finance.jpg',
    description: 'classroom 1',
  };
  ngOnInit() {
    if (!this.classroom.image) {
      this.classroom.image = 'assets/images/finance.jpg';
    }
  }
  constructor(private router: Router) {}

}
