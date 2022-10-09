import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { miniDocsList } from '../mini-docs-list';
import { MiniDocs } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  /** Checking breakpoint @media for mobile and ipad mini */
  isHandset$: Observable<boolean>;
  /** At home */
  atHome$ = new BehaviorSubject(true);
  /** Page size to display */
  pageSize$ = new BehaviorSubject(10);
  /** The filtered tags to be displayed on the list */
  filteredTagsList$ = new BehaviorSubject<string[]>([]);
  /** The filtered title to be displayed on the list */
  filteredTitlesList$ = new BehaviorSubject<string[]>([]);
  /** Determines if titles and tags are filtered or not */
  isFiltered = new BehaviorSubject(false);
  /** All tags */
  private tags: string[] = [];
  /** All titles */
  private titles: string[] = [];

  private iPadMiniPortrait = '(max-width: 768px) and (orientation: portrait)';

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
    /** Breakpoints list to close chatSidenav */
    const bps = [
      Breakpoints.Handset,
      this.iPadMiniPortrait
    ];

    this.isHandset$ = this.breakpointObserver.observe(bps)
      .pipe(
        map((bp) => bp.matches),
        shareReplay(1) // share only the last boolean value
      );

    this.initAllTags();
    this.initAllTitles();
  }

  private initAllTags(): void {
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
    this.filteredTagsList$.next(this.tags);
    this.isFiltered.next(false);
  }

  private initAllTitles(): void {
    miniDocsList.forEach((item) => {
      if (!item.metadata?.exclude_title) {
        this.titles.push(item.title);
      }
    });
    this.filteredTitlesList$.next(this.titles);
  }

  filterTitles(miniDocs: MiniDocs[]): void {
    const filter: string[] = [];
    miniDocs.forEach((item) => {
      if (!item.metadata?.exclude_title) {
        filter.push(item.title);
      }
    });
    this.filteredTitlesList$.next(filter);


    if (this.titles.length === filter.length) {
      this.isFiltered.next(true);
    } else {
      this.isFiltered.next(false);
    }

  }

  /** Clear filter and display all tags */
  resetTags(): void {
    this.filteredTagsList$.next(this.tags);
  }

}
