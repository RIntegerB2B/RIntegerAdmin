export class Notification {
    mobileNumber: Number;
    title: String;
    notificationBody: String;
    constructor(
        mobileNumber: Number,
        title: String,
        notificationBody: String
    ) {
            this.mobileNumber = mobileNumber;
            this.title = title;
            this.notificationBody = notificationBody;
        }
}
