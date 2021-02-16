import { Component, Input } from '@angular/core';
import { Alert } from '../../alert.model';

@Component({
    selector: 'app-single-alert',
    templateUrl: './single-alert.component.html',
    styleUrls: ['./single-alert.component.scss']
})
export class SingleAlertComponent {
    @Input()alert: Alert;

    isRead() {
        return `3px solid ${this.alert.isRead ? 'green' : 'red'}` ;
    }
}