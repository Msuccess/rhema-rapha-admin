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

    constructor() {}
}
