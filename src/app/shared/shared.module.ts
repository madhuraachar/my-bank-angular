import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { LoaderComponent } from './loader/loader.component';
import { TruncatePipe } from './truncate.pipe';
@NgModule({
    declarations: [CardComponent, LoaderComponent, TruncatePipe],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, CardComponent, LoaderComponent, TruncatePipe]
})
export class SharedModule{}