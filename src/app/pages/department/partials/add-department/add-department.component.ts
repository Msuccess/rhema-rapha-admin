import { UtilService } from './../../../../core/services/util.service';
import { DepartmentModel } from './../../model/department.model';
import { DepartmentService } from './../../service/department.service';
import { ErrorService } from './../../../../core/services/error.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
})
export class AddDepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  loading = new BehaviorSubject<boolean>(false);
  errors = new BehaviorSubject<string>('');
  hasFormErrors = false;
  department = {} as DepartmentModel;

  constructor(
    private fb: FormBuilder,
    private errorService: ErrorService,
    private utilService: UtilService,
    private departmentService: DepartmentService,
    public dialogRef: MatDialogRef<AddDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DepartmentModel,
  ) {
    
  }

  initDepartmentForm() {
    this.departmentForm = this.fb.group({
      description: [
        this.department.description,
        Validators.compose([Validators.required]),
      ],
      name: [this.department.name, Validators.compose([Validators.required])],
    });
  }

  /**
   * Form Submit
   */
  submit() {
    this.loading.next(true);
    const controls = this.departmentForm.controls;
    /** check form */
    if (this.departmentForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched(),
      );
      return;
    }

    this.departmentService.create(this.departmentForm.value).subscribe(
      (res) => {
        this.dialogRef.close(true);
        this.loading.next(false);
        this.utilService.showSuccessToast('Department Added Successfully');
        console.log(res);
      },
      (err) => {
        this.loading.next(false);
        this.hasFormErrors = true;

        this.errors.next(this.errorService.getErrors(err));
        console.log(this.errors.getValue());
      },
    );
  }

  close(dismissedAlert: any): void {
    // tslint:disable-next-line: no-unused-expression
    alert !== dismissedAlert;
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.departmentForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  ngOnInit() {
    this.initDepartmentForm();
  }
}
