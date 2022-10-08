import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { popIn } from '../../my-animation';
import { StateService } from '../../shared/services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [popIn]
})
export class HeaderComponent {

  atHome: Observable<boolean>;

  constructor(private state$: StateService) {
    this.atHome = this.state$.atHome$;
  }

}
