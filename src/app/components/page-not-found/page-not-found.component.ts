import { Component, OnInit } from '@angular/core';
import { StateService } from '../../shared/services/state.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private state$: StateService) { }

  ngOnInit(): void {
    // Adding timeout to prevent error
    // Error: NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    setTimeout(() => {
      this.state$.atHome$.next(false);
    });
  }

}
