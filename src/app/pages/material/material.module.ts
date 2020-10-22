import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBar,
    MatSnackBarModule,
} from '@angular/material';

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
    ],
    providers: [MatDatepickerModule, MatSnackBar],
})
export class MaterialModule {}
