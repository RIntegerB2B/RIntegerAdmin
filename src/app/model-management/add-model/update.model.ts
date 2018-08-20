export class UpdateModel {
    id: string;
    userName: string;
    description: string;
    availability: boolean;
    mobileNumber: Number;
    emailId: string;
    faceBook: string;
    whatsapp: string;
    portfolioImageName: string;
    catalogImageName: string;
    serviceProviderId: string;
    serviceProviderName: string;
    serviceProviderCompanyName: string;
    modelType: string;
    categoryType: string;
    constructor(
        id: string,
        userName: string,
        description: string,
        availability: boolean,
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
