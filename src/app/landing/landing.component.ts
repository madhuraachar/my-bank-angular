import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from './store/user.actions';
import * as fromApp from './../store/app.reducer';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit{
  
  constructor(private store: Store<fromApp.AppState>) { }
  ngOnInit() {
    this.store.dispatch(new UserActions.LoadDetails())
  }
}
