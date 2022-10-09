import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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

  }
}
