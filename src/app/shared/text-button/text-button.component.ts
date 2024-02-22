import {Component} from '@angular/core';

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss'],
})
export class TextButtonComponent {
  displayText: string[] = [
    'Use existing content or create sets from scratch',
    'Enable auto-grading for any assignment',
    'Receive snapshots of student progress',
    'View automated insights of assignment performance trends',
    'Build student confidence with immediate feedback',
    'Ensure student access to resources anytime',
  ];

  handleButtonClick(text: number): void {
    if (text === 1) {
      this.displayText = [
        'Use existing content or create sets from scratch',
        'Enable auto-grading for any assignment',
        'Receive snapshots of student progress',
        'View automated insights of assignment performance trends',
        'Build student confidence with immediate feedback',
        'Ensure student access to resources anytime',
      ];
    } else if (text === 2) {
      this.displayText = [
        'Provide individual guidance with prompts, encouragement, and automated hints',
        'Enable students to show work so teachers better understand their thinking',
        'Access a built-in resource section with skill cards and video tutorials',
        'Empower students to check their answers to know if they are on the right track',
        'Ensure support for multiple input devices that allow for handwriting, drawing, and symbolic expressions',
      ];
    }
  }
}
