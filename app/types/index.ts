export type IContact = {
    _id: string;
    name: string;
    email: string;
    phone_number: string;
    address: string;
    profilePicture: string;
    created_time: string;
    __v: number;
}

export type IContactList = IContact[];

export type ContactHomeState = {
    contacts: IContact[];
}