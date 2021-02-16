import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NAVIGATION_LIST } from './../../shared/navigation';
@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() onSideNavSelect = new EventEmitter<void>()
  navigationItems: any[] = NAVIGATION_LIST;

  constructor(){}
  ngOnInit(){
  }

  onSelectOption() {
    this.onSideNavSelect.emit();
  }
}