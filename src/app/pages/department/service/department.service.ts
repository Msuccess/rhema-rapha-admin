import { DataService } from './../../../core/services/data.service';
import { Injectable } from '@angular/core';
import { DepartmentModel } from '../model/department.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends DataService<DepartmentModel> {
  constructor(public http: HttpClient) {
    super(http, 'department');
  }
}
