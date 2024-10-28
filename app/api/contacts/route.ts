/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi";
import connectDb from "../config/db";
import ContactModel from "../models/contacts.model";
import { store_image } from "../helper_functions/image_handle";

// validation schema
const schema = Joi.object({
    name: Joi.string().min(1).required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name is required',
        'any.required': 'Name is required',
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email is required',
      }),
    phone_number: Joi.string().required().messages({
        'string.base': 'Phone number should be a type of text',
        'string.empty': 'Phone number is required',
        'any.required': 'Phone number is required',
      }),
    address: Joi.string().required().messages({
        'string.base': 'Address should be a type of text',
        'string.empty': 'Address is required',
        'any.required': 'Address is required',
      }),
    profilePicture: Joi.object({
        name: Joi.string().required().messages({
            'string.base': 'Profile picture name should be a type of text',
            'string.empty': 'Profile picture name is required',
            'any.required': 'Profile picture name is required',
          }),
        size: Joi.number().max(1024 * 1024 * 2).required().messages({
            'number.base': 'Profile picture size should be a number',
            'number.max': 'Profile picture size should be less than 2MB',
            'any.required': 'Profile picture size is required',
          }),
      }).required().messages({
        'object.base': 'Profile picture should be an object',
        'any.required': 'Profile picture is required',
      }),
});


export async function GET() {
    await connectDb();
    const allContacts = await ContactModel.find({});

    return Response.json(allContacts);
}

export async function POST(request: Request) {
    try {
        await connectDb();
        const data = await request.formData();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const picture: any = data.getAll('profilePicture')[0];

        const profilePicture = {
            name: decodeURIComponent(picture['name']),
            size: picture['size']
        }

        const name = data.get('name');
        const address = data.get('address');
        const email = data.get('email');
        const phone_number = data.get('phone_number');

        await schema.validateAsync({
            name,
            address,
            email,
            phone_number,
            profilePicture: profilePicture
         });

         store_image(picture);

        const newData = new ContactModel({
            name,
            address,
            email,
            phone_number,
            created_time: new Date(),
            profilePicture: picture['name']
        });

        await newData.save();

        return Response.json(newData);
    } catch (er: any) {
        return Response.json({ error: er.details[0].message || 'Something went wrong' }, { status: 500 })
    }
}
