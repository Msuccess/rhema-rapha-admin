import { PatientModel } from './../../patient/model/patient.model';
import { DoctorModel } from './../../doctor/model/doctor.model';
export class AppointmentModel {
    id: string;
    description: string;
    date: Date;
    appointmentTime: string;
    type: string;
    appointmentDay: string;
    doctorId: string;
    patientId: string;
    isCanceled: boolean;
    doctor: DoctorModel;
    patient: PatientModel;

    constructor() {}
}
