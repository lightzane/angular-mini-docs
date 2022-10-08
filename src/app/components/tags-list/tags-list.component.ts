import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { listPopIn } from '../../my-animation';
import { miniDocsList } from '../../shared/mini-docs-list';
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

  constructor() { }

  ngOnInit(): void {
    miniDocsList.forEach((item) => {
      const tagsList = item.metadata?.tags;
      if (tagsList?.length) {
        tagsList.forEach((tag) => {
          if (!this.tags.includes(tag.toLowerCase())) {
            this.tags.unshift(tag);
          }
        });
      }
    });
    this.tags = this.tags.sort();
  }

  getSlug = getSlug;

}
