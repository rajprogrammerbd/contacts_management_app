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
    updateData: (id: string) => void;
    id: string;
}

export interface IMyDialog {
    open: boolean;
    id: string;
    onClose: () => void;
}

export interface IMyDialogState {
    name: string;
    address: string;
    email: string;
    phone_number: string;
}

export interface IUpdateContactProps {
    name: string;
    address: string;
    email: string;
    phone_number: string;
    id: string;
}

export type PATCHDataResponse = IContact;

export type IOpenState = {
    status: boolean;
    id: string;
}

// Partial<IMyDialogState>