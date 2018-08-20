export class PushNotification {
    mobileNumber: string;
    title: string;
    isAdmin: boolean;
    notificationBody: string;
    imageUrl: string;
    constructor(
        mobileNumber: string,
        title: string,
        isAdmin: boolean,
        notificationBody: string,
        imageUrl: string) {
        this.mobileNumber = mobileNumber;
        this.title = title;
        this.isAdmin = isAdmin;
        this.notificationBody = notificationBody;
        this.imageUrl = imageUrl;
    }
}
