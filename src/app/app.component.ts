import { Component, HostListener, OnInit } from '@angular/core';
import { slide } from './my-animation';
import { StateService } from './shared/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slide]
})
export class AppComponent implements OnInit {

  isHandset = false;

  showHeaderToolbar = false;

  private scrollTop = 0;

  // @HostListener('window:scroll', ['$event'])
  // onScroll(): void {
  //   this.showHeaderToolbar = this.scrollTop > window.scrollY && this.scrollTop > 80;
  //   this.scrollTop = window.scrollY;
  // }

  constructor(private state$: StateService) { }

  ngOnInit(): void {
    this.initStates();
  }

  private initStates(): void {
    this.state$.isHandset$.subscribe(v => this.isHandset = v);
  }

}
