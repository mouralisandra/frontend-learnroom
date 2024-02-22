import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() name: string = '';
  @Input() avatarColor: string = '#000000';

  get initials(): string {
    return this.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  get backgroundColor(): string {
    return this.avatarColor;
  }
}
