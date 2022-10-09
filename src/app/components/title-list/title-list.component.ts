import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { listPopIn } from '../../my-animation';
import { StateService } from '../../shared/services/state.service';
import { getSlug } from '../../shared/utils';

@Component({
  selector: 'app-title-list',
  templateUrl: './title-list.component.html',
  styleUrls: ['./title-list.component.scss'],
  animations: [listPopIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleListComponent implements OnInit {

  titles: string[] = [];

  isFiltered = true;

  constructor(
    private state$: StateService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.state$.isFiltered.pipe(
      map(v => this.isFiltered = v),
      switchMap(() => this.state$.filteredTitlesList$)
    ).subscribe(
      v => {
        this.titles = v;
        this.cd.detectChanges();
      }
    );
  }

  getSlug = getSlug;

}
