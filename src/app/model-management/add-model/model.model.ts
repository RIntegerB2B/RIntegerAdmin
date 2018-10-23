export class Model {
    userName: string;
    description: string;
    availability: Number;
    mobileNumber: Number;
    emailId: string;
    faceBook: string;
    whatsapp: string;
    primeImage: string;
    ecommerceImageName: [string];
    productImageName: [string];
    portraitImageName: [string];
    porFolioImageName: [string];
    catalogImageName: string;
    serviceProviderId: string;
    serviceProviderName: string;
    serviceProviderCompanyName: string;
    modelType: string;
    categoryType: string;
    height: string;
    measurements: string;
    shoulder: string;
    shoeSize: string;
    isScheduledBooking: boolean;
    constructor(
        userName: string,
        description: string,
        availability: Number,
        mobileNumber: Number,
        emailId: string,
        faceBook: string,
        whatsapp: string,
        modelType: string,
        categoryType: string
        ) {
        this.userName = userName;
        this.description = description;
     this.availability = availability;
        this.mobileNumber = mobileNumber;
        this.emailId = emailId;
        this.faceBook = faceBook;
        this.whatsapp = whatsapp;
        this.modelType = modelType;
        this.categoryType = categoryType;

    }
}
