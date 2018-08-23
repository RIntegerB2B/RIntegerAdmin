export class Status {
    _id: Number;
    mobileNumber: Number;
    bookingId: Number;
    bookingOrderId: String;
    bookingDate: String;
    order: Boolean;
    materialPickedUp: Number;
    shootCompleted: Number;
    imageEditing: Number;
    delivery: Number;
    payment: Number;
    materialReturn: Number;
    constructor(
        _id: Number,
        mobileNumber: Number,
        bookingId: Number,
        bookingDate: String,
        order: Boolean,
        materialPickedUp: Number,
        shootCompleted: Number,
        imageEditing: Number,
        delivery: Number,
        payment: Number,
        materialReturn: Number
    ) {
        this._id = _id;
        this.mobileNumber = mobileNumber;
        this.bookingId = bookingId;
        this.bookingDate = bookingDate;
        this.order = order;
        this.materialPickedUp = materialPickedUp;
        this.shootCompleted = shootCompleted;
        this.imageEditing = imageEditing;
        this.delivery = delivery;
        this.payment = payment;
        this.materialReturn = materialReturn;
    }
}
