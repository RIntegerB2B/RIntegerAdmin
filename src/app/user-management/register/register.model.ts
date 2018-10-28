export class Register {
    userName: string;
    password: string;
    mobileNumber: number;
    email: string;
    role: string;
    constructor(
        userName: string,
        password: string,
        mobileNumber: number,
        email: string,
        role: string,
        ) {
        this.userName = userName;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.role = role;
    }
}