import Joi from "joi";
import connectDb from "../config/db";
import ContactModel from "../models/contacts.model";
import { store_image } from "../helper_functions/image_handle";

// validation schema
const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone_number: Joi.string().required(),
    address: Joi.string().required(),
    profilePicture: Joi.object({
        name: Joi.string().required(),
        size: Joi.number().max(1024 * 1024 * 2).required()
      }).required()
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
            name: picture['name'],
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
            profilePicture: picture['name']
        });

        await newData.save();

        return Response.json(newData);
    } catch (er) {
        console.error(er);

        return Response.json({ error: 'An unexpected error occured' }, { status: 500 })
    }
}
