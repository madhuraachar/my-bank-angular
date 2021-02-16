import {Component, Input } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
    selector: 'app-contact-type',
    templateUrl: './contact-type.component.html',
    styleUrls: ['./contact-type.component.scss']
})
export class ContactTypeComponent {
    @Input() contact: Contact
}