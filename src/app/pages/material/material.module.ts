import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ToastrModule } from 'ngx-toastr';
import { AvatarModule } from 'ngx-avatar';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatMenuModule,
        MatIconModule,
        ToastrModule.forRoot(),
        AvatarModule,
        MatTabsModule,
    ],
    exports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        ToastrModule,
        MatIconModule,
        MatMenuModule,
        AvatarModule,
        MatTabsModule,
    ],

    providers: [
        MatDatepickerModule,
        MatSnackBar,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
    ],
})
export class MaterialModule {}
