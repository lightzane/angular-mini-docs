import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { listPopIn } from '../../my-animation';
import { miniDocsList } from '../../shared/mini-docs-list';
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

  constructor() { }

  ngOnInit(): void {
    this.initTitles();
  }

  private initTitles(): void {
    miniDocsList.forEach((item) => {
      if (!item.metadata?.exclude_title) {
        this.titles.push(item.title);
      }
    });
  }

  getSlug = getSlug;

}
