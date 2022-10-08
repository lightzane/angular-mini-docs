import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../shared/services/state.service';
import { SubscriptionsContainer } from '../../shared/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isHandset = false;

  private subs = new SubscriptionsContainer();

  constructor(private state$: StateService) { }

  ngOnInit(): void {
    this.initStates();
  }

  ngOnDestroy(): void {
    this.subs.dispose();
  }

  private initStates(): void {
    this.subs.add = this.state$.isHandset$.subscribe(v => this.isHandset = v);
  }

}
