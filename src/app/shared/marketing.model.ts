export class Market {
    _id: string;
    customerName: string;
    mobileNumber: string;
    whatsAppNo: string;
    landLine: string;
    email: string;
    location: string;
    constructor(
        customerName: string,
        mobileNumber: string,
        whatsAppNo: string,
        landLine: string,
        email: string,
        location: string,
    ) {
        this.customerName = customerName;
        this.mobileNumber = mobileNumber;
        this.whatsAppNo = whatsAppNo;
        this.landLine = landLine;
        this.email = email;
        this.location = location;
    }
}
