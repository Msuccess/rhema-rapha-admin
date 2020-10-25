export class ProfileModel {
    id: string;
    email: string;
    fullName: string;
    phonenumber: string;
    address: string;
    password: string;
    role: string;

    constructor() {}
}

export class ChangePasswordModel {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
