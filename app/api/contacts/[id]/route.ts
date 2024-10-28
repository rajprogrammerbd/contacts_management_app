/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi";
import { access, open, constants } from "node:fs/promises";
import path from "node:path";
import connectDb from "../../config/db";
import ContactModel from "../../models/contacts.model";
import { remove_image } from "../../helper_functions/image_handle";
import { NextResponse } from "next/server";

interface RequestBody {
    name: string;
    address: string;
    email: string;
    phone_number: string;
}

const schema = Joi.object({
    name: Joi.string().min(1),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone_number: Joi.string(),
    address: Joi.string()
});

export async function PATCH(
    request: Request & { body: RequestBody },
    { params }: { params: Promise<{ id: string }> }

) {
    const { id } = await params;
    
    try {
        await connectDb();
        
        const find = await ContactModel.findById(id);

        if (!find) {
            return Response.json({ message: "Contact not found" }, { status: 404 });
        }

        const { name, address, email, phone_number } = await request.json();

        if (!(name || address || email || phone_number)) {
            return Response.json({ message: 'At least one or more data required' }, { status: 404 });
        }


        const validResult = await schema.validateAsync({
            name,
            address,
            email,
            phone_number
         });

         const updated = await ContactModel.findByIdAndUpdate(id, { ...validResult }, { new: true });

        return Response.json(updated);
    } catch (er: any) {
        return Response.json({ message: er.message }, { status: 404 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    
    try {
        await connectDb();

        const find = await ContactModel.findById(id);

        if (!find) {
            return Response.json({ message: "Contact not found" }, { status: 404 });
        }

        await ContactModel.findByIdAndDelete(id);
        remove_image(find.profilePicture);
        return Response.json({ "message": "Resource successfully deleted" }, { status: 200 });
    } catch (er: any) {
        console.log(er);
        return Response.json({ message: er.message }, { status: 404 });
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }

) {
    const { id } = await params;
    
    try {
        const complete_path = path.join(process.cwd(), "app", "api", "assets", id);

        await access(complete_path, constants.R_OK);

        const fileHandler = await open(complete_path, 'r');

        const stream = fileHandler.createReadStream();

        const headers = new Headers({
            "Content-Type": "image/jpeg",
            "Cache-Control": "no-store",
        });

        return new NextResponse(stream as any, {
            headers,
            status: 200,
        });

    } catch (er: any) {
        console.log(er);
        return Response.json({ message: "Image doesn't exist" }, { status: 404 });
    }
}
