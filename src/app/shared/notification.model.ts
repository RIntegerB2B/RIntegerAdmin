export class Notification {
    mobileNumber: Number;
    title: String;
    name: String;
    notificationBody: String;
    date: String;
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
