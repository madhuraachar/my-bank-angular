import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value, truncateLength) {
        if(value) {
            return `${value.slice(0, truncateLength)}...`
        }
        return value
    }
}