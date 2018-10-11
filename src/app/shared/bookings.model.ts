export class Booking {
    bookingOrderId: string;
    bookingStatus: number;
    mobileNumber: number;
    name: string;
    location: string;
    emailId: string;
    bookingDate: string;
    constructor(
        name: string,
        mobileNumber: number ,
        location: string,
        emailId: string,
) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.location = location;
        this.emailId = emailId;

    }
}

