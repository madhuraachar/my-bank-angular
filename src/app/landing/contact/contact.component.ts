import  {Component} from '@angular/core';
import { Contact } from './contact.model';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
    contactTypes: Contact[] = [
        new Contact('call', 'TALK WITH US', 'Please talk to our team for more offers and querries', '8197493227'),
        new Contact('message', 'SEND QUERY', 'You can write us to below mail', 'madhurachar2@gmail.com')
    ]
}