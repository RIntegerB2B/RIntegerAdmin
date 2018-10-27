export class PushNotification {
    mobileNumber: string;
    whatsappText: string;
    constructor(
        mobileNumber: string,
        whatsappText: string
        ) {
        this.mobileNumber = mobileNumber;
        this.whatsappText = whatsappText;
    }
}
