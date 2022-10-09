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

  pageSize = 10;

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
    this.listenRouteParams();
    this.state$.pageSize$.subscribe(v => this.pageSize = v);
  }

  ngAfterViewInit(): void {
    this.initPage();
    this.reHighlight();
  }

  private listenRouteParams(): void {
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
        this.state$.resetTags();
        this.state$.filterTitles(miniDocsList);
        setTimeout(() => {
          this.state$.atHome$.next(true);
        });
      }
    });
  }

  reHighlight(): void {
    // need timeout since "hljs.highlightAll()" is asynchronous 
    // (the first method is called in <script> of index.html)
    if (isPlatformBrowser(this.platformId)) {

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
    this.state$.filterTitles(pages);
    if (pages.length) {
      this.pages = pages;
      this.selectedTag = tag;
      this.initPage();
      this.reHighlight();
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          this.state$.atHome$.next(false);
        });
      }
    } else {
      this.router.navigateByUrl('page-not-found');
      this.selectedTag = undefined;
    }
  }

  private initPage(pageIndex = 0): void {
    if (this.$paginator) {
      this.onPageChange({ pageIndex, pageSize: this.pageSize, length: this.pages.length });
    }
  }

  onPageChange(event: PageEvent): void {

    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.pages.length) {
      endIndex = this.pages.length;
    }

    this.state$.pageSize$.next(event.pageSize);

    // ? [BETTER PERFORMANCE] as data already stored in memory
    this.filteredPages = this.pages.slice(startIndex, endIndex);

    this.cd.detectChanges();

    // there is a bug and thus requires another "setTimeout"
    // else it will not reHighlight
    this.reHighlight();

  }

}
