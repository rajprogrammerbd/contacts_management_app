/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { IFormInput, IUpdateContactProps } from "../types";
import { toast } from 'react-toastify';

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
    try {
        const new_data = new FormData();
        new_data.append('name', body.name);
        new_data.append('address', body.address);
        new_data.append('email', body.email);
        new_data.append('phone_number', body.phone_number);
        new_data.append('profilePicture', body.profilePicture[0]);
    
        const { data } = await axios.post('/api/contacts', new_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        });
    
        return data;
    } catch (er: any) {
        toast(er.response.data.error || "Something went wrong")
    }
}
  