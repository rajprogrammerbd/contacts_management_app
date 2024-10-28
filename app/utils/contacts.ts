import axios from "axios";

export async function getAllContacts() {
    const { data } = await axios.get('/api/contacts');
    
    return data;
}
