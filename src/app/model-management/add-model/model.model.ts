export class Model {
    position: Number;
    userName: string;
    description: string;
    availability: string;
    mobileNumber: Number;
    emailId: string;
    faceBook: string;
    whatsapp: string;
    primeImage: string;
    ecommerceImages: [string];
    productImages: [string];
    portFolioImages: [string];
    ecommerceImageName: [string];
    productImageName: [string];
    portraitImageName: [string];
    portFolioImageName: [string];
    catalogImageName: string;
    serviceProviderId: string;
    serviceProviderName: string;
    serviceProviderCompanyName: string;
    modelType: string;
    categoryType: string;
    height: string;
    bust: string;
    chest: string;
    waist: string;
    hips: string;
    hair: string;
    eyes: string;
    shoulder: string;
    shoeSize: string;
    topsize: string;
    bottomsize: string;
    isScheduledBooking: boolean;
    scheduledDate: string;
    constructor(
        position: Number,
        userName: string,
        description: string,
        availability: string,
        mobileNumber: Number,
        emailId: string,
        faceBook: string,
        whatsapp: string,
        modelType: string,
        categoryType: string,
        height: string,
        bust: string,
        chest: string,
        waist: string,
        hips: string,
        hair: string,
        eyes: string,
        shoulder: string,
        shoeSize: string,
        topsize: string,
        bottomsize: string
    ) {
        this.position = position;
        this.userName = userName;
        this.description = description;
        this.availability = availability;
        this.mobileNumber = mobileNumber;
        this.emailId = emailId;
        this.faceBook = faceBook;
        this.whatsapp = whatsapp;
        this.modelType = modelType;
        this.categoryType = categoryType;
        this.height = height;
        this.bust = bust;
        this.chest = chest;
        this.waist = waist;
        this.hips = hips;
        this.hair = hair;
        this.eyes = eyes;
        this.shoulder = shoulder;
        this.shoeSize = shoeSize;
        this.topsize = topsize;
        this.bottomsize = bottomsize;
    }
}
