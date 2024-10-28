import { Schema } from "mongoose";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactsSchema = new Schema({
    name: { type: String, min: 1, required: true },
    email: {
        type: String,
        required: [false, 'Email is required'],
        validate: {
            validator: function(email: string): boolean {
                return emailRegex.test(email)
            },
            message: (props: { value: string }) => `${props.value}`
        }
    },
    phone_number: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        required: true
    }
});

export default contactsSchema;
