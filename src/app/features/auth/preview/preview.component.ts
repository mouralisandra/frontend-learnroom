import {Component} from '@angular/core';
import {Router} from '@angular/router';

interface GridItem {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  constructor(private router: Router) {}
  gridItems: GridItem[] = [
    {
      image: '../../assets/images/image1.png',
      title: 'All-in-one place',
      description:
        'Bring all your learning tools together and manage multiple classes in one central destination.',
    },
    {
      image: '../../assets/images/image2.png',
      title: 'Easy to use',
      description:
        'Anyone in your school community can get up and running with Classroom in minutes.',
    },
    {
      image: '../../assets/images/image3.png',
      title: 'Built for collaboration',
      description:
        'Work simultaneously and connect face-to-face with Google Meet.',
    },
    {
      image: '../../assets/images/image4.png',
      title: 'Access from anywhere',
      description:
        'Empower teaching and learning from anywhere, on any device, and give your class more flexibility.',
    },
  ];
  startSignup(): void {
    this.router.navigate(['auth/login']);
  }
  goToPreview(): void {
    this.router.navigate(['/preview']);
  }
}
