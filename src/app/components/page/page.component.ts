import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { popIn } from '../../my-animation';
import { HLJS_CLASS } from '../../shared/constants';
import { MiniDocs } from '../../shared/interfaces';
import { miniDocsList } from '../../shared/mini-docs-list';
import { StateService } from '../../shared/services/state.service';
import { getInitial, getSlug } from '../../shared/utils';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  animations: [popIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit, AfterViewInit {

  page?: MiniDocs;

  newerPage?: MiniDocs;

  olderPage?: MiniDocs;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private router: Router,
    private state$: StateService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const title = param.get('title');
      if (title) {
        this.getPage(title);

        // add timeout to prevent NG0100: ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.state$.atHome$.next(false);
        });
        this.cd.detectChanges();
        this.reHighlight();
        this.scrollToTop();
      }
    }
    );
  }

  ngAfterViewInit(): void {
    // need timeout since "hljs.highlightAll()" is asynchronous 
    // (the first method is called in <script> of index.html)
    this.reHighlight();
  }

  reHighlight(): void {
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

  getPage(title: string): void {
    const index = miniDocsList.findIndex(item => getSlug(item.title) === title);
    if (index > -1) {
      this.page = miniDocsList[index];

      let newer = index - 1;
      let older = index + 1;

      newer = newer >= 0 ? newer : 0;
      older = older <= miniDocsList.length ? older : miniDocsList.length;

      this.newerPage = miniDocsList[newer];
      this.olderPage = miniDocsList[older];

      // display only the tags of the current page
      this.filterTags();

    } else {
      this.router.navigateByUrl('page-not-found');
    }
  }

  private filterTags(): void {
    const tags: string[] = [];
    this.page?.metadata?.tags?.forEach((tag) => {
      if (!tags.includes(tag.toLowerCase())) {
        tags.unshift(tag);
      }
    });
    this.state$.filteredTagsList$.next(tags.sort());
  }

  visitAuthorUrl(url?: string): void {
    if (isPlatformBrowser(this.platformId) && url) {
      window.open(url, '_blank');
    }
  }

  /**
   * The page on the right can either be an `older` page or just a `next` page
   * @param nextTarget the `published_date` of the target page
   * @returns `true` if page on the right is older date
   */
  isRightPageOlder(nextTarget?: string): boolean {

    const currentPageDate = this.page?.metadata?.published_date;

    if (currentPageDate && nextTarget) {
      const d1 = +new Date(currentPageDate);
      const d2 = +new Date(nextTarget);

      if (d1 > d2) {
        return true;
      }
    }

    return false;
  }

  /**
   * The page on the left can either be a `newer` page or just `previous` page
   * @param nextTarget the `published_date` of the target page
   * @returns `true` if page on the right is older date
   */
  isLeftPageOlder(nextTarget?: string): boolean {

    const currentPageDate = this.page?.metadata?.published_date;

    if (currentPageDate && nextTarget) {
      const d1 = +new Date(currentPageDate);
      const d2 = +new Date(nextTarget);

      if (d1 >= d2) {
        return true;
      }
    }

    // so it will display as 'previous' ..
    // .. if current page and the page on the left has no date
    if (!nextTarget) {
      return true;
    }

    return false;
  }

  private scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

}
