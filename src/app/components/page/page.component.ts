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
      }
    }
    );
  }

  ngAfterViewInit(): void {
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

  getPage(title: string): void {
    const pageContent = miniDocsList.find(item => getSlug(item.title) === title);
    if (pageContent) {
      this.page = pageContent;
    } else {
      this.router.navigateByUrl('page-not-found');
    }
  }

  visitAuthorUrl(url?: string): void {
    if (isPlatformBrowser(this.platformId) && url) {
      window.open(url, '_blank');
    }
  }

}
