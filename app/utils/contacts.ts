/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { IFormInput, IUpdateContactProps } from "../types";

export async function getAllContacts() {
    const { data } = await axios.get('/api/contacts');
    
    return data;
}

export async function updateContact(values: Partial<IUpdateContactProps>) {
    const { id, ...rest } = values;

    const { data } = await axios.patch(`/api/contacts/${id}`, rest);

    return data;
}

export async function deleteContact(id: string) {
    const { data } = await axios.delete(`/api/contacts/${id}`);

    return data;
}

export async function addNewContact(body: IFormInput) {
    const new_data = new FormData();
    console.log('checks', body.profilePicture[0]);
     new_data.append('name', body.name);
     new_data.append('address', body.address);
     new_data.append('email', body.email);
     new_data.append('phone_number', body.phone_number);
     new_data.append('profilePicture', body.profilePicture);

    const { data } = await axios.post('/api/contacts', new_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return data;
}