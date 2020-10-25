import { DepartmentModel } from '../../department/model/department.model';

export class DoctorModel {
    id: string;
    email: string;
    fullName: string;
    phonenumber: string;
    departmentId: string;
    daysAvailable: string;
    timesAvailable: string;
    address: string;
    password: string;
    role: string;
    department: DepartmentModel;

    constructor() {}
}
