import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { listPopIn } from '../../my-animation';
import { miniDocsList } from '../../shared/mini-docs-list';
import { StateService } from '../../shared/services/state.service';
import { getSlug } from '../../shared/utils';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss'],
  animations: [listPopIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsListComponent implements OnInit {

  tags: string[] = [];

  isFiltered = true;

  constructor(
    private state$: StateService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.state$.isFiltered.pipe(
      map(v => this.isFiltered = v),
      switchMap(() => this.state$.filteredTagsList$)
    ).subscribe(
      v => {
        this.tags = v;
        this.cd.detectChanges();
      }
    );
  }

  getSlug = getSlug;

}
