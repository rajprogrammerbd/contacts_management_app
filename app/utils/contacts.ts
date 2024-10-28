import axios from "axios";
import { IUpdateContactProps } from "../types";

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
