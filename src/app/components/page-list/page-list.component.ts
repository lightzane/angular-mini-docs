import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID, ViewChildren } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { listAnim } from '../../my-animation';
import { HLJS_CLASS } from '../../shared/constants';
import { MiniDocs } from '../../shared/interfaces';
import { miniDocsList } from '../../shared/mini-docs-list';
import { StateService } from '../../shared/services/state.service';
import { getInitial, getSlug } from '../../shared/utils';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  animations: [listAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageListComponent implements OnInit, AfterViewInit {

  @Output() onReadMoreClick = new EventEmitter();

  pages: MiniDocs[] = [];

  filteredPages: MiniDocs[] = [];

  selectedTag?: string;

  @ViewChildren('myPaginator') $paginator?: MatPaginator;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private state$: StateService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const tag = param.get('tag');
      if (tag) {
        this.getTag(tag);
        this.cd.detectChanges();
        setTimeout(() => {
          this.state$.atHome$.next(false);
        });
      } else {
        this.pages = miniDocsList;
        this.selectedTag = undefined;
        setTimeout(() => {
          this.state$.atHome$.next(true);
        });
      }
    });
  }

  ngAfterViewInit(): void {
    // need timeout since "hljs.highlightAll()" is asynchronous 
    // (the first method is called in <script> of index.html)
    if (isPlatformBrowser(this.platformId)) {

      this.initPage();

      setTimeout(() => {
        const hljsExists = this.document.querySelectorAll(HLJS_CLASS).length;
        if (!hljsExists) {
          hljs.highlightAll();
        }
      });

    }
  }

  getInitial = getInitial;

  getSlug = getSlug;

  readMoreClicked(): void {
    this.onReadMoreClick.emit();
  }

  visitAuthorUrl(url?: string): void {
    if (isPlatformBrowser(this.platformId) && url) {
      window.open(url, '_blank');
    }
  }

  getTag(tag: string): void {
    const pages = miniDocsList.filter(item => item.metadata?.tags?.includes(tag.toLowerCase().replace(/-/g, ' ')));
    if (pages.length) {
      this.pages = pages;
      this.selectedTag = tag;
      this.initPage();
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          this.state$.atHome$.next(false);
          const hljsExists = this.document.querySelectorAll(HLJS_CLASS).length;
          if (!hljsExists) {
            hljs.highlightAll();
          }
        });
      }
    } else {
      this.router.navigateByUrl('page-not-found');
      this.selectedTag = undefined;
    }
  }

  private initPage(pageIndex = 0, pageSize = 10): void {
    if (this.$paginator) {
      this.onPageChange({ pageIndex, pageSize, length: this.pages.length });
    }
  }

  onPageChange(event: PageEvent): void {

    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.pages.length) {
      endIndex = this.pages.length;
    }

    console.log(startIndex, endIndex);

    // ? [BETTER PERFORMANCE] as data already stored in memory
    this.filteredPages = this.pages.slice(startIndex, endIndex);

  }

}
