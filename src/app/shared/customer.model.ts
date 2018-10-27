export class Customer {
    _id: string;
    mobileNumber: string;
    name: string;
    emailId: string;
    location: string;
    bookingType: [string];
    shootType: [String];
    modelType: [String];
    product: [String];
    companyAddress: String;
    gstNumber: String;
    customerGrade: String;
    brandName: String;
    constructor(
        mobileNumber: string,
        name: string,
        emailId: string,
        location: string,
        bookingType: [string],
        shootType: [String],
        modelType: [String],
        product: [String],
        companyAddress: String,
        gstNumber: String,
        customerGrade: String,
        brandName: String,
    ) {
        this.mobileNumber = mobileNumber;
        this.name = name;
        this.emailId = emailId;
        this.location = location;
        this.bookingType = bookingType;
        this.shootType = shootType;
        this.modelType = modelType;
        this.product = product;
        this.companyAddress = companyAddress;
        this.gstNumber = gstNumber;
        this.customerGrade = customerGrade;
        this.brandName = brandName;
    }
}