import { Component, OnInit } from '@angular/core';
import { Alert } from '../alert.model';

@Component({
    selector: 'app-alert-list',
    templateUrl: './alert-list.component.html',
    styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent implements OnInit {
    alertList: Alert[] = [
        new Alert("test alert 1", new Date(), false),
        new Alert("test alert 2", new Date(), true)
    ]
    constructor() {}
    ngOnInit() {

    }
}