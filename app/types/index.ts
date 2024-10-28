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

export interface IContactCard {
    username: string;
    image: string;
    phone_number: string;
    email: string;
    address: string;
    created_time: string;
}
