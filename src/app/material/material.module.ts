import { NgModule } from "@angular/core";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    exports: [
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        MatPaginatorModule,
        MatTooltipModule
    ]
})
export class MaterialModule { }
