import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent {
  @Input() user = {} as User;
  constructor() { }
}
