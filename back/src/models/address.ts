import mongoose, { Schema } from 'mongoose'


interface UI {
    Address: string,
    block_no: string,
    building_no: string,
    city: string,
    district: string,
    state: string,
    zipcode: string,
    country: string,
}

const AddressSchema = new Schema({
    Address: {
        type: String,
        required: true
    },
    block_no: {
        type: String,
        required: true
    },
    building_no: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
},
    {
        versionKey: false,
        timestamps: true
    });

const Address = mongoose.model<UI>("Address", AddressSchema);
export default Address
